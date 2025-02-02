/*
 * Copyright [2021] [Doric.Pub]
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
//
// Created by pengfei.zhou on 2021/10/25.
//

#import <DoricExtensions.h>
#import "DoricBundleResourceLoader.h"
#import "DoricBundleResource.h"

@interface DoricBundleResourceLoader ()
@property(nonatomic, strong) NSBundle *bundle;
@property(nonatomic, copy) NSString *resourceType;
@end

@implementation DoricBundleResourceLoader
- (instancetype)initWithResourceType:(NSString *)resourceType bundle:(NSBundle *)bundle {
    if (self = [super init]) {
        _resourceType = resourceType;
        _bundle = bundle;
    }
    return self;
}

- (__kindof DoricResource *)load:(NSString *)identifier withContext:(DoricContext *)context {
    return [[[DoricBundleResource alloc] initWithContext:context identifier:identifier]
            also:^(DoricBundleResource *it) {
                it.bundle = self.bundle;
            }];
}

@end
