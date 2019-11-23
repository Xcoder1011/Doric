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

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import pub.doric.navigator.IDoricNavigator;

/**
 * @Description: pub.doric
 * @Author: pengfei.zhou
 * @CreateDate: 2019-11-23
 */
public class DoricFragment extends Fragment implements IDoricNavigator {

    public static DoricFragment newInstance(String scheme, String alias) {
        Bundle args = new Bundle();
        args.putString("scheme", scheme);
        args.putString("alias", alias);
        DoricFragment fragment = new DoricFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.doric_fragment, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        Bundle argument = getArguments();
        if (argument != null) {
            String alias = argument.getString("alias");
            String scheme = argument.getString("scheme");
            push(scheme, alias);
        }
    }

    @Override
    public void push(String scheme, String alias) {
        getChildFragmentManager().beginTransaction()
                .add(R.id.root, DoricPanelFragment.newInstance(scheme, alias))
                .addToBackStack(scheme)
                .commit();
    }

    @Override
    public void pop() {
        if (canPop()) {
            getChildFragmentManager().popBackStack();
        } else {
            if (getActivity() != null) {
                getActivity().finish();
            }
        }
    }

    public boolean canPop() {
        return getChildFragmentManager().getBackStackEntryCount() > 1;
    }
}
