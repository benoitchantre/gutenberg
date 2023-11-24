"use strict";(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[1785],{"./packages/compose/build-module/hooks/use-constrained-tabbing/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/keycodes/build-module/index.js"),_wordpress_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/dom/build-module/index.js"),_use_ref_effect__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/compose/build-module/hooks/use-ref-effect/index.js");__webpack_exports__.Z=function useConstrainedTabbing(){return(0,_use_ref_effect__WEBPACK_IMPORTED_MODULE_0__.Z)((node=>{function onKeyDown(event){const{keyCode:keyCode,shiftKey:shiftKey,target:target}=event;if(keyCode!==_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_1__.Mf)return;const action=shiftKey?"findPrevious":"findNext",nextElement=_wordpress_dom__WEBPACK_IMPORTED_MODULE_2__.T_.tabbable[action](target)||null;if(target.contains(nextElement))return event.preventDefault(),void nextElement?.focus();if(node.contains(nextElement))return;const domAction=shiftKey?"append":"prepend",{ownerDocument:ownerDocument}=node,trap=ownerDocument.createElement("div");trap.tabIndex=-1,node[domAction](trap),trap.addEventListener("blur",(()=>node.removeChild(trap))),trap.focus()}return node.addEventListener("keydown",onKeyDown),()=>{node.removeEventListener("keydown",onKeyDown)}}),[])}},"./packages/compose/build-module/hooks/use-focus-on-mount/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return useFocusOnMount}});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_dom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/dom/build-module/index.js");function useFocusOnMount(focusOnMount="firstElement"){const focusOnMountRef=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(focusOnMount),setFocus=target=>{target.focus({preventScroll:!0})},timerId=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{focusOnMountRef.current=focusOnMount}),[focusOnMount]),(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>()=>{timerId.current&&clearTimeout(timerId.current)}),[]),(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((node=>{var _node$ownerDocument$a;node&&!1!==focusOnMountRef.current&&(node.contains(null!==(_node$ownerDocument$a=node.ownerDocument?.activeElement)&&void 0!==_node$ownerDocument$a?_node$ownerDocument$a:null)||("firstElement"!==focusOnMountRef.current?setFocus(node):timerId.current=setTimeout((()=>{const firstTabbable=_wordpress_dom__WEBPACK_IMPORTED_MODULE_1__.T_.tabbable.find(node)[0];firstTabbable&&setFocus(firstTabbable)}),0)))}),[])}},"./packages/compose/build-module/hooks/use-focus-return/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");let origin=null;__webpack_exports__.Z=function useFocusReturn(onFocusReturn){const ref=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),focusedBeforeMount=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),onFocusReturnRef=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(onFocusReturn);return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{onFocusReturnRef.current=onFocusReturn}),[onFocusReturn]),(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((node=>{if(node){if(ref.current=node,focusedBeforeMount.current)return;focusedBeforeMount.current=node.ownerDocument.activeElement}else if(focusedBeforeMount.current){const isFocused=ref.current?.contains(ref.current?.ownerDocument.activeElement);var _origin;if(ref.current?.isConnected&&!isFocused)return void(null!==(_origin=origin)&&void 0!==_origin||(origin=focusedBeforeMount.current));onFocusReturnRef.current?onFocusReturnRef.current():(focusedBeforeMount.current.isConnected?focusedBeforeMount.current:origin)?.focus(),origin=null}}),[])}},"./packages/compose/build-module/hooks/use-merge-refs/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return useMergeRefs}});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function assignRef(ref,value){"function"==typeof ref?ref(value):ref&&ref.hasOwnProperty("current")&&(ref.current=value)}function useMergeRefs(refs){const element=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(),isAttached=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),didElementChange=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),previousRefs=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)([]),currentRefs=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(refs);return currentRefs.current=refs,(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{!1===didElementChange.current&&!0===isAttached.current&&refs.forEach(((ref,index)=>{const previousRef=previousRefs.current[index];ref!==previousRef&&(assignRef(previousRef,null),assignRef(ref,element.current))})),previousRefs.current=refs}),refs),(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{didElementChange.current=!1})),(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((value=>{assignRef(element,value),didElementChange.current=!0,isAttached.current=null!==value;const refsToAssign=value?currentRefs.current:previousRefs.current;for(const ref of refsToAssign)assignRef(ref,value)}),[])}},"./packages/compose/build-module/hooks/use-ref-effect/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return useRefEffect}});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function useRefEffect(callback,dependencies){const cleanup=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((node=>{node?cleanup.current=callback(node):cleanup.current&&cleanup.current()}),dependencies)}},"./packages/dom/build-module/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{T_:function(){return build_module_focus}});var focusable_namespaceObject={};__webpack_require__.r(focusable_namespaceObject),__webpack_require__.d(focusable_namespaceObject,{find:function(){return find}});var tabbable_namespaceObject={};function isVisible(element){return element.offsetWidth>0||element.offsetHeight>0||element.getClientRects().length>0}function find(context,{sequential:sequential=!1}={}){const elements=context.querySelectorAll(function buildSelector(sequential){return[sequential?'[tabindex]:not([tabindex^="-"])':"[tabindex]","a[href]","button:not([disabled])",'input:not([type="hidden"]):not([disabled])',"select:not([disabled])","textarea:not([disabled])",'iframe:not([tabindex^="-"])',"object","embed","area[href]","[contenteditable]:not([contenteditable=false])"].join(",")}(sequential));return Array.from(elements).filter((element=>{if(!isVisible(element))return!1;const{nodeName:nodeName}=element;return"AREA"!==nodeName||function isValidFocusableArea(element){const map=element.closest("map[name]");if(!map)return!1;const img=element.ownerDocument.querySelector('img[usemap="#'+map.name+'"]');return!!img&&isVisible(img)}(element)}))}function getTabIndex(element){const tabIndex=element.getAttribute("tabindex");return null===tabIndex?0:parseInt(tabIndex,10)}function isTabbableIndex(element){return-1!==getTabIndex(element)}function mapElementToObjectTabbable(element,index){return{element:element,index:index}}function mapObjectTabbableToElement(object){return object.element}function compareObjectTabbables(a,b){const aTabIndex=getTabIndex(a.element),bTabIndex=getTabIndex(b.element);return aTabIndex===bTabIndex?a.index-b.index:aTabIndex-bTabIndex}function filterTabbable(focusables){return focusables.filter(isTabbableIndex).map(mapElementToObjectTabbable).sort(compareObjectTabbables).map(mapObjectTabbableToElement).reduce(function createStatefulCollapseRadioGroup(){const CHOSEN_RADIO_BY_NAME={};return function collapseRadioGroup(result,element){const{nodeName:nodeName,type:type,checked:checked,name:name}=element;if("INPUT"!==nodeName||"radio"!==type||!name)return result.concat(element);const hasChosen=CHOSEN_RADIO_BY_NAME.hasOwnProperty(name);if(!checked&&hasChosen)return result;if(hasChosen){const hadChosenElement=CHOSEN_RADIO_BY_NAME[name];result=result.filter((e=>e!==hadChosenElement))}return CHOSEN_RADIO_BY_NAME[name]=element,result.concat(element)}}(),[])}function tabbable_find(context){return filterTabbable(find(context))}function findPrevious(element){return filterTabbable(find(element.ownerDocument.body)).reverse().find((focusable=>element.compareDocumentPosition(focusable)&element.DOCUMENT_POSITION_PRECEDING))}function findNext(element){return filterTabbable(find(element.ownerDocument.body)).find((focusable=>element.compareDocumentPosition(focusable)&element.DOCUMENT_POSITION_FOLLOWING))}__webpack_require__.r(tabbable_namespaceObject),__webpack_require__.d(tabbable_namespaceObject,{find:function(){return tabbable_find},findNext:function(){return findNext},findPrevious:function(){return findPrevious},isTabbableIndex:function(){return isTabbableIndex}});const build_module_focus={focusable:focusable_namespaceObject,tabbable:tabbable_namespaceObject}},"./packages/icons/build-module/library/close.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/primitives/build-module/svg/index.js");const close=(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Wj,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.y$,{d:"M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"}));__webpack_exports__.Z=close},"./packages/keycodes/build-module/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Ac:function(){return rawShortcut},Bi:function(){return PAGEDOWN},E_:function(){return displayShortcut},J3:function(){return shortcutAriaLabel},K5:function(){return ENTER},L_:function(){return SPACE},Mf:function(){return TAB},RL:function(){return LEFT},Sd:function(){return HOME},UP:function(){return UP},WV:function(){return DOWN},ZH:function(){return BACKSPACE},hY:function(){return ESCAPE},kC:function(){return F10},pX:function(){return RIGHT},uR:function(){return END},vd:function(){return isKeyboardEvent},wx:function(){return PAGEUP},yY:function(){return DELETE}});var change_case__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/capital-case/dist.es2015/index.js"),_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/i18n/build-module/index.js"),_platform__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/keycodes/build-module/platform.js");const BACKSPACE=8,TAB=9,ENTER=13,ESCAPE=27,SPACE=32,PAGEUP=33,PAGEDOWN=34,END=35,HOME=36,LEFT=37,UP=38,RIGHT=39,DOWN=40,DELETE=46,F10=121,ALT="alt",CTRL="ctrl",COMMAND="meta",SHIFT="shift";function mapValues(object,mapFn){return Object.fromEntries(Object.entries(object).map((([key,value])=>[key,mapFn(value)])))}const modifiers={primary:_isApple=>_isApple()?[COMMAND]:[CTRL],primaryShift:_isApple=>_isApple()?[SHIFT,COMMAND]:[CTRL,SHIFT],primaryAlt:_isApple=>_isApple()?[ALT,COMMAND]:[CTRL,ALT],secondary:_isApple=>_isApple()?[SHIFT,ALT,COMMAND]:[CTRL,SHIFT,ALT],access:_isApple=>_isApple()?[CTRL,ALT]:[SHIFT,ALT],ctrl:()=>[CTRL],alt:()=>[ALT],ctrlShift:()=>[CTRL,SHIFT],shift:()=>[SHIFT],shiftAlt:()=>[SHIFT,ALT],undefined:()=>[]},rawShortcut=mapValues(modifiers,(modifier=>(character,_isApple=_platform__WEBPACK_IMPORTED_MODULE_1__.R)=>[...modifier(_isApple),character.toLowerCase()].join("+"))),displayShortcutList=mapValues(modifiers,(modifier=>(character,_isApple=_platform__WEBPACK_IMPORTED_MODULE_1__.R)=>{const isApple=_isApple(),replacementKeyMap={[ALT]:isApple?"⌥":"Alt",[CTRL]:isApple?"⌃":"Ctrl",[COMMAND]:"⌘",[SHIFT]:isApple?"⇧":"Shift"};return[...modifier(_isApple).reduce(((accumulator,key)=>{var _replacementKeyMap$ke;const replacementKey=null!==(_replacementKeyMap$ke=replacementKeyMap[key])&&void 0!==_replacementKeyMap$ke?_replacementKeyMap$ke:key;return isApple?[...accumulator,replacementKey]:[...accumulator,replacementKey,"+"]}),[]),(0,change_case__WEBPACK_IMPORTED_MODULE_2__.I)(character,{stripRegexp:/[^A-Z0-9~`,\.\\\-]/gi})]})),displayShortcut=mapValues(displayShortcutList,(shortcutList=>(character,_isApple=_platform__WEBPACK_IMPORTED_MODULE_1__.R)=>shortcutList(character,_isApple).join(""))),shortcutAriaLabel=mapValues(modifiers,(modifier=>(character,_isApple=_platform__WEBPACK_IMPORTED_MODULE_1__.R)=>{const isApple=_isApple(),replacementKeyMap={[SHIFT]:"Shift",[COMMAND]:isApple?"Command":"Control",[CTRL]:"Control",[ALT]:isApple?"Option":"Alt",",":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Comma"),".":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Period"),"`":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Backtick"),"~":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tilde")};return[...modifier(_isApple),character].map((key=>{var _replacementKeyMap$ke2;return(0,change_case__WEBPACK_IMPORTED_MODULE_2__.I)(null!==(_replacementKeyMap$ke2=replacementKeyMap[key])&&void 0!==_replacementKeyMap$ke2?_replacementKeyMap$ke2:key)})).join(isApple?" ":" + ")}));const isKeyboardEvent=mapValues(modifiers,(getModifiers=>(event,character,_isApple=_platform__WEBPACK_IMPORTED_MODULE_1__.R)=>{const mods=getModifiers(_isApple),eventMods=function getEventModifiers(event){return[ALT,CTRL,COMMAND,SHIFT].filter((key=>event[`${key}Key`]))}(event),replacementWithShiftKeyMap={Comma:",",Backslash:"\\",IntlRo:"\\",IntlYen:"\\"},modsDiff=mods.filter((mod=>!eventMods.includes(mod))),eventModsDiff=eventMods.filter((mod=>!mods.includes(mod)));if(modsDiff.length>0||eventModsDiff.length>0)return!1;let key=event.key.toLowerCase();return character?(event.altKey&&1===character.length&&(key=String.fromCharCode(event.keyCode).toLowerCase()),event.shiftKey&&1===character.length&&replacementWithShiftKeyMap[event.code]&&(key=replacementWithShiftKeyMap[event.code]),"del"===character&&(character="delete"),key===character.toLowerCase()):mods.includes(key)}))},"./packages/keycodes/build-module/platform.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function isAppleOS(_window=null){if(!_window){if("undefined"==typeof window)return!1;_window=window}const{platform:platform}=_window.navigator;return-1!==platform.indexOf("Mac")||["iPad","iPhone"].includes(platform)}__webpack_require__.d(__webpack_exports__,{R:function(){return isAppleOS}})},"./packages/primitives/build-module/svg/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Cd:function(){return Circle},G:function(){return G},UL:function(){return Rect},Wj:function(){return SVG},y$:function(){return Path}});var classnames__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__),_wordpress_element__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js");const Circle=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle",props),G=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g",props),Path=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path",props),Rect=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect",props),SVG=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((({className:className,isPressed:isPressed,...props},ref)=>{const appliedProps={...props,className:classnames__WEBPACK_IMPORTED_MODULE_0___default()(className,{"is-pressed":isPressed})||void 0,"aria-hidden":!0,focusable:!1};return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg",{...appliedProps,ref:ref})}));SVG.displayName="SVG"}}]);