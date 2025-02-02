/*
 * Copyright [2019] [Doric.Pub]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package pub.doric;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.LifecycleOwner;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import java.util.concurrent.Callable;

import pub.doric.async.AsyncCall;
import pub.doric.async.AsyncResult;
import pub.doric.navbar.BaseDoricNavBar;
import pub.doric.navigator.IDoricNavigator;
import pub.doric.utils.DoricLog;

/**
 * @Description: pub.doric
 * @Author: pengfei.zhou
 * @CreateDate: 2019-11-23
 */
public class DoricPanelFragment extends Fragment implements IDoricNavigator {
    private DoricPanel doricPanel;
    private final Handler uiHandler = new Handler(Looper.getMainLooper());
    private FrameLayout maskView;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.doric_framgent_panel, container, false);
    }


    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        maskView = requireActivity().getWindow().getDecorView().findViewById(R.id.doric_mask);
        if (doricPanel == null) {
            doricPanel = view.findViewById(R.id.doric_panel);
            loadJSBundle();
        } else {
            DoricPanel panel = view.findViewById(R.id.doric_panel);
            if (doricPanel != panel) {
                DoricContext doricContext = doricPanel.getDoricContext();
                doricPanel = panel;
                if (doricContext == null) {
                    loadJSBundle();
                } else {
                    panel.config(doricContext);
                }
            }
        }
        if (getContext() instanceof LifecycleOwner) {
            ((LifecycleOwner) getContext()).getLifecycle().removeObserver(doricPanel);
        }
    }

    @Override
    public void push(String source, String alias, String extra) {
        if (getActivity() == null || getActivity().isFinishing()) {
            return;
        }
        Bundle argument = new Bundle();
        argument.putString("source", source);
        argument.putString("alias", alias);
        argument.putString("extra", extra);
        NavController navController = getNavController();
        if (navController != null) {
            getNavController()
                    .navigate(R.id.action_doricPanelFragment_to_doricPanelFragment, argument);
        }
    }


    @Override
    public void pop() {
        if (getActivity() == null || getActivity().isFinishing()) {
            return;
        }
        NavController navController = getNavController();
        if (navController != null && !navController.popBackStack()) {
            getActivity().finish();
        }
    }

    @Nullable
    private NavController getNavController() {
        if (getView() == null) {
            return null;
        }
        return Navigation.findNavController(getView());
    }

    @Override
    public void onResume() {
        super.onResume();
        if (doricPanel != null) {
            doricPanel.onActivityResume();
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        if (doricPanel != null) {
            doricPanel.onActivityPause();
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (doricPanel != null) {
            doricPanel.onActivityDestroy();
        }
    }

    private void hideMask() {
        AsyncCall.ensureRunInHandler(uiHandler, new Callable<Object>() {
            @Override
            public Object call() {
                maskView.setVisibility(View.GONE);
                return null;
            }
        });
    }

    private void showLoading() {
        AsyncCall.ensureRunInHandler(uiHandler, new Callable<Object>() {
            @Override
            public Object call() {
                maskView.setVisibility(View.VISIBLE);
                maskView.findViewById(R.id.doric_mask_loading).setVisibility(View.VISIBLE);
                maskView.findViewById(R.id.doric_mask_error).setVisibility(View.GONE);
                return null;
            }
        });
    }

    private void showError() {
        AsyncCall.ensureRunInHandler(uiHandler, new Callable<Object>() {
            @Override
            public Object call() {
                maskView.setVisibility(View.VISIBLE);
                maskView.findViewById(R.id.doric_mask_loading).setVisibility(View.GONE);
                maskView.findViewById(R.id.doric_mask_error).setVisibility(View.VISIBLE);
                View retryView = maskView.findViewById(R.id.doric_mask_error_retry);
                if (retryView != null) {
                    retryView.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            loadJSBundle();
                        }
                    });
                }
                return null;
            }
        });
    }

    private void loadJSBundle() {
        Bundle argument = getArguments();
        if (argument == null) {
            if (getActivity() != null && getActivity().getIntent() != null) {
                argument = getActivity().getIntent().getExtras();
            }
        }
        if (argument == null) {
            DoricLog.e("DoricPanelFragment argument is null");
            return;
        }
        showLoading();
        final String alias = argument.getString("alias");
        String source = argument.getString("source");
        final String extra = argument.getString("extra");
        DoricSingleton.getInstance().getJSLoaderManager().loadJSBundle(source).setCallback(new AsyncResult.Callback<String>() {
            @Override
            public void onResult(String result) {
                if (getActivity() == null) {
                    return;
                }
                doricPanel.config(result, alias, extra);
                DoricContext context = doricPanel.getDoricContext();
                context.setDoricNavigator(DoricPanelFragment.this);
                BaseDoricNavBar navBar = requireActivity().getWindow().getDecorView().findViewById(R.id.doric_nav_bar);
                context.setDoricNavBar(navBar);
                hideMask();
            }

            @Override
            public void onError(Throwable t) {
                if (getActivity() == null) {
                    return;
                }
                DoricLog.e("DoricPanelFragment load JS error:" + t.getLocalizedMessage());
                showError();
            }

            @Override
            public void onFinish() {

            }
        });
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        doricPanel.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        doricPanel.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}
