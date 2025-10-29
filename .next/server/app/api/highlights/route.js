"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/highlights/route";
exports.ids = ["app/api/highlights/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fhighlights%2Froute&page=%2Fapi%2Fhighlights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fhighlights%2Froute.ts&appDir=%2FUsers%2Fmacbookpro%2FPersonal%20Work%2Ftecverse03%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacbookpro%2FPersonal%20Work%2Ftecverse03&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fhighlights%2Froute&page=%2Fapi%2Fhighlights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fhighlights%2Froute.ts&appDir=%2FUsers%2Fmacbookpro%2FPersonal%20Work%2Ftecverse03%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacbookpro%2FPersonal%20Work%2Ftecverse03&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_macbookpro_Personal_Work_tecverse03_app_api_highlights_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/highlights/route.ts */ \"(rsc)/./app/api/highlights/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/highlights/route\",\n        pathname: \"/api/highlights\",\n        filename: \"route\",\n        bundlePath: \"app/api/highlights/route\"\n    },\n    resolvedPagePath: \"/Users/macbookpro/Personal Work/tecverse03/app/api/highlights/route.ts\",\n    nextConfigOutput,\n    userland: _Users_macbookpro_Personal_Work_tecverse03_app_api_highlights_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/highlights/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZoaWdobGlnaHRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZoaWdobGlnaHRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGaGlnaGxpZ2h0cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1hY2Jvb2twcm8lMkZQZXJzb25hbCUyMFdvcmslMkZ0ZWN2ZXJzZTAzJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1hY2Jvb2twcm8lMkZQZXJzb25hbCUyMFdvcmslMkZ0ZWN2ZXJzZTAzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNzQjtBQUNuRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3RlY2h2ZXJzZS0yMDI2Lz8wZjhhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9tYWNib29rcHJvL1BlcnNvbmFsIFdvcmsvdGVjdmVyc2UwMy9hcHAvYXBpL2hpZ2hsaWdodHMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2hpZ2hsaWdodHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9oaWdobGlnaHRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9oaWdobGlnaHRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL21hY2Jvb2twcm8vUGVyc29uYWwgV29yay90ZWN2ZXJzZTAzL2FwcC9hcGkvaGlnaGxpZ2h0cy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvaGlnaGxpZ2h0cy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fhighlights%2Froute&page=%2Fapi%2Fhighlights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fhighlights%2Froute.ts&appDir=%2FUsers%2Fmacbookpro%2FPersonal%20Work%2Ftecverse03%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacbookpro%2FPersonal%20Work%2Ftecverse03&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/highlights/route.ts":
/*!*************************************!*\
  !*** ./app/api/highlights/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\n\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__.createClient)(\"https://xplcgqfweqzliiwchmqw.supabase.co\", \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwbGNncWZ3ZXF6bGlpd2NobXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0Njc4MTAsImV4cCI6MjA3NzA0MzgxMH0.llyAt2gPKx7ARwyigyqVk77xuG267nBGdd0WxgOaCPQ\");\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const featured = searchParams.get(\"featured\");\n        const year = searchParams.get(\"year\");\n        const category = searchParams.get(\"category\");\n        let query = supabase.from(\"event_highlights\").select(\"*\").eq(\"is_active\", true);\n        if (featured === \"true\") {\n            query = query.eq(\"is_featured\", true);\n        }\n        if (year) {\n            query = query.eq(\"event_year\", parseInt(year));\n        }\n        if (category) {\n            query = query.eq(\"category\", category);\n        }\n        const { data: highlights, error } = await query.order(\"is_featured\", {\n            ascending: false\n        }).order(\"event_year\", {\n            ascending: false\n        }).order(\"display_order\", {\n            ascending: true\n        });\n        if (error) {\n            console.error(\"Error fetching highlights:\", error);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Failed to fetch highlights\"\n            }, {\n                status: 500\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            highlights\n        });\n    } catch (error) {\n        console.error(\"Highlights API error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"An error occurred\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2hpZ2hsaWdodHMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXVEO0FBQ0g7QUFFcEQsTUFBTUUsV0FBV0QsbUVBQVlBLENBQzNCRSwwQ0FBb0MsRUFDcENBLGtOQUF5QztBQUdwQyxlQUFlSSxJQUFJQyxPQUFvQjtJQUM1QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJRixRQUFRRyxHQUFHO1FBQzVDLE1BQU1DLFdBQVdILGFBQWFJLEdBQUcsQ0FBQztRQUNsQyxNQUFNQyxPQUFPTCxhQUFhSSxHQUFHLENBQUM7UUFDOUIsTUFBTUUsV0FBV04sYUFBYUksR0FBRyxDQUFDO1FBRWxDLElBQUlHLFFBQVFkLFNBQ1RlLElBQUksQ0FBQyxvQkFDTEMsTUFBTSxDQUFDLEtBQ1BDLEVBQUUsQ0FBQyxhQUFhO1FBRW5CLElBQUlQLGFBQWEsUUFBUTtZQUN2QkksUUFBUUEsTUFBTUcsRUFBRSxDQUFDLGVBQWU7UUFDbEM7UUFFQSxJQUFJTCxNQUFNO1lBQ1JFLFFBQVFBLE1BQU1HLEVBQUUsQ0FBQyxjQUFjQyxTQUFTTjtRQUMxQztRQUVBLElBQUlDLFVBQVU7WUFDWkMsUUFBUUEsTUFBTUcsRUFBRSxDQUFDLFlBQVlKO1FBQy9CO1FBRUEsTUFBTSxFQUFFTSxNQUFNQyxVQUFVLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1QLE1BQ3ZDUSxLQUFLLENBQUMsZUFBZTtZQUFFQyxXQUFXO1FBQU0sR0FDeENELEtBQUssQ0FBQyxjQUFjO1lBQUVDLFdBQVc7UUFBTSxHQUN2Q0QsS0FBSyxDQUFDLGlCQUFpQjtZQUFFQyxXQUFXO1FBQUs7UUFFNUMsSUFBSUYsT0FBTztZQUNURyxRQUFRSCxLQUFLLENBQUMsOEJBQThCQTtZQUM1QyxPQUFPdkIscURBQVlBLENBQUMyQixJQUFJLENBQUM7Z0JBQUVKLE9BQU87WUFBNkIsR0FBRztnQkFBRUssUUFBUTtZQUFJO1FBQ2xGO1FBRUEsT0FBTzVCLHFEQUFZQSxDQUFDMkIsSUFBSSxDQUFDO1lBQUVMO1FBQVc7SUFDeEMsRUFBRSxPQUFPQyxPQUFPO1FBQ2RHLFFBQVFILEtBQUssQ0FBQyx5QkFBeUJBO1FBQ3ZDLE9BQU92QixxREFBWUEsQ0FBQzJCLElBQUksQ0FBQztZQUFFSixPQUFPO1FBQW9CLEdBQUc7WUFBRUssUUFBUTtRQUFJO0lBQ3pFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZWNodmVyc2UtMjAyNi8uL2FwcC9hcGkvaGlnaGxpZ2h0cy9yb3V0ZS50cz81ODY1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcydcblxuY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoXG4gIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCEsXG4gIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIVxuKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpXG4gICAgY29uc3QgZmVhdHVyZWQgPSBzZWFyY2hQYXJhbXMuZ2V0KCdmZWF0dXJlZCcpXG4gICAgY29uc3QgeWVhciA9IHNlYXJjaFBhcmFtcy5nZXQoJ3llYXInKVxuICAgIGNvbnN0IGNhdGVnb3J5ID0gc2VhcmNoUGFyYW1zLmdldCgnY2F0ZWdvcnknKVxuXG4gICAgbGV0IHF1ZXJ5ID0gc3VwYWJhc2VcbiAgICAgIC5mcm9tKCdldmVudF9oaWdobGlnaHRzJylcbiAgICAgIC5zZWxlY3QoJyonKVxuICAgICAgLmVxKCdpc19hY3RpdmUnLCB0cnVlKVxuXG4gICAgaWYgKGZlYXR1cmVkID09PSAndHJ1ZScpIHtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkuZXEoJ2lzX2ZlYXR1cmVkJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBpZiAoeWVhcikge1xuICAgICAgcXVlcnkgPSBxdWVyeS5lcSgnZXZlbnRfeWVhcicsIHBhcnNlSW50KHllYXIpKVxuICAgIH1cblxuICAgIGlmIChjYXRlZ29yeSkge1xuICAgICAgcXVlcnkgPSBxdWVyeS5lcSgnY2F0ZWdvcnknLCBjYXRlZ29yeSlcbiAgICB9XG5cbiAgICBjb25zdCB7IGRhdGE6IGhpZ2hsaWdodHMsIGVycm9yIH0gPSBhd2FpdCBxdWVyeVxuICAgICAgLm9yZGVyKCdpc19mZWF0dXJlZCcsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgICAgLm9yZGVyKCdldmVudF95ZWFyJywgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgICAub3JkZXIoJ2Rpc3BsYXlfb3JkZXInLCB7IGFzY2VuZGluZzogdHJ1ZSB9KVxuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBoaWdobGlnaHRzOicsIGVycm9yKVxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggaGlnaGxpZ2h0cycgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGhpZ2hsaWdodHMgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdIaWdobGlnaHRzIEFQSSBlcnJvcjonLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0FuIGVycm9yIG9jY3VycmVkJyB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjcmVhdGVDbGllbnQiLCJzdXBhYmFzZSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSIsIkdFVCIsInJlcXVlc3QiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJmZWF0dXJlZCIsImdldCIsInllYXIiLCJjYXRlZ29yeSIsInF1ZXJ5IiwiZnJvbSIsInNlbGVjdCIsImVxIiwicGFyc2VJbnQiLCJkYXRhIiwiaGlnaGxpZ2h0cyIsImVycm9yIiwib3JkZXIiLCJhc2NlbmRpbmciLCJjb25zb2xlIiwianNvbiIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/highlights/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/tslib","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fhighlights%2Froute&page=%2Fapi%2Fhighlights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fhighlights%2Froute.ts&appDir=%2FUsers%2Fmacbookpro%2FPersonal%20Work%2Ftecverse03%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacbookpro%2FPersonal%20Work%2Ftecverse03&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();