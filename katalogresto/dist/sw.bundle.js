/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-1c3feaa0'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "app.bundle.js",
    "revision": "f0594f06b5555552f35b9e83c8d2c12f"
  }, {
    "url": "defaultVendors-node_modules_ansi-html-community_index_js-node_modules_css-loader_dist_runtime-5370d2.bundle.js",
    "revision": "1e6ef9fc68f6f27b5b77421c506cc693"
  }, {
    "url": "defaultVendors-node_modules_html-entities_lib_named-references_js.bundle.js",
    "revision": "81f806c78622b5e41a116cddaaec25ea"
  }, {
    "url": "defaultVendors-node_modules_lazysizes_plugins_parent-fit_ls_parent-fit_js-node_modules_regene-8ac0d0.bundle.js",
    "revision": "314b09576cf222eecca0d1a68ddeda69"
  }, {
    "url": "defaultVendors-node_modules_style-loader_dist_runtime_injectStylesIntoStyleTag_js-node_module-355fe1.bundle.js",
    "revision": "8b3c4dc944c86acf9e93daad13310624"
  }, {
    "url": "defaultVendors-node_modules_webpack-dev-server_client_socket_js-node_modules_webpack-dev-serv-b7b0e9.bundle.js",
    "revision": "1a3fd5fd10b5fdc0ba524ee1227101a3"
  }, {
    "url": "favicon.png",
    "revision": "dff169b53c054ae7a086f5b425b3ae8b"
  }, {
    "url": "index.html",
    "revision": "08807abb1de857ea68b5389aed25acb6"
  }, {
    "url": "public/app.webmanifest",
    "revision": "b20032e76773fa1c1899e69048e4ae74"
  }, {
    "url": "public/favicon.png",
    "revision": "dff169b53c054ae7a086f5b425b3ae8b"
  }, {
    "url": "public/icons/RA-128-128.png",
    "revision": "702f6cfcff892472cfe5ae87dd9825cd"
  }, {
    "url": "public/icons/RA-144-144.png",
    "revision": "b1203cf5bcc4127fd15ca054c60b8c60"
  }, {
    "url": "public/icons/RA-192-192.png",
    "revision": "bf7142e6451e0555f5ad9eb7938c2b59"
  }, {
    "url": "public/icons/RA-48-48.png",
    "revision": "667b95c07ce2b4d99a6699fdb7fcfedc"
  }, {
    "url": "public/icons/RA-512-512.png",
    "revision": "03ae7227560d731f82947b2a9956ea34"
  }, {
    "url": "public/icons/RA-72-72.png",
    "revision": "ff4bd8c8e46478d0e3de15ac136e7b3d"
  }, {
    "url": "public/icons/RA-96-96.png",
    "revision": "f901cfc1cd3e31e4aafff42b2498fa97"
  }, {
    "url": "public/images/K.png",
    "revision": "dff169b53c054ae7a086f5b425b3ae8b"
  }, {
    "url": "public/images/heros/hero-image_2-desktop.jpg",
    "revision": "3cc75d29a1d63a84641abee3623161f6"
  }, {
    "url": "public/images/heros/hero-image_2-mobile.jpg",
    "revision": "f3f53777d167120e5b00b6559b655edb"
  }], {});
  workbox.registerRoute(({
    url
  }) => url.href.startsWith('https://restaurant-api.dicoding.dev'), new workbox.StaleWhileRevalidate({
    "cacheName": "restaurant-api-cache",
    plugins: []
  }), 'GET');
  workbox.registerRoute(({
    url
  }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/small/<pictureId>'), new workbox.StaleWhileRevalidate({
    "cacheName": "restaurant-images-small-cache",
    plugins: []
  }), 'GET');
  workbox.registerRoute(({
    url
  }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/medium/<pictureId>'), new workbox.StaleWhileRevalidate({
    "cacheName": "restaurant-images-medium-cache",
    plugins: []
  }), 'GET');
  workbox.registerRoute(({
    url
  }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/large/<pictureId>'), new workbox.StaleWhileRevalidate({
    "cacheName": "restaurant-images-large-cache",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.bundle.js.map
