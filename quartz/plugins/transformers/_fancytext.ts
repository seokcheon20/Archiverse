import { QuartzTransformerPlugin } from "../types"
// thanks https://github.com/Naraenda/quartz-ascone/blob/v4-ascone/quartz/plugins/transformers/fancytext.ts 
const charming_js = `
// minified https://github.com/yuanqing/charming
// const c=function(e,{tagName:t="span",split:n,setClassName:r=function(e){return"char"+e}}={}){e.normalize();let i=1;function o(e){let o=e.parentNode,a=e.nodeValue,l=n?n(a):a.split("");l.forEach(function(n){let a=document.createElement(t),l=r(i++,n);l&&(a.className=l),a.appendChild(document.createTextNode(n)),a.setAttribute("aria-hidden","true"),o.insertBefore(a,e)}),""!==a.trim()&&o.setAttribute("aria-label",a),o.removeChild(e)}!function e(t){if(3===t.nodeType)return o(t);let n=Array.prototype.slice.call(t.childNodes),r=n.length;if(1===r&&3===n[0].nodeType)return o(n[0]);n.forEach(function(t){e(t)})}(e)};
const c=function(e,{tagName:t="span",split:n,setClassName:r=function(e){return"char"+e}}={}){e.normalize();let i=1;function o(e){let o=e.parentNode,a=e.nodeValue,l=n?n(a):a.split("");l.forEach(function(n){let a=document.createElement(t),l=r(i++,n);l&&(a.className=l),a.appendChild(document.createTextNode(n)),a.setAttribute("aria-hidden","true"),o.insertBefore(a,e)}),o.setAttribute("aria-label",a),o.removeChild(e)}!function e(t){if(3===t.nodeType)return o(t);let n=Array.prototype.slice.call(t.childNodes),r=n.length;if(1===r&&3===n[0].nodeType)return o(n[0]);n.forEach(function(t){e(t)})}(e)};
document.querySelectorAll('.ft-letters:not(.ft-letters .ft-letters)').forEach((e)=>c(e,{setClassName:()=>'char'}))
`

export const FancyText: QuartzTransformerPlugin = () => {
    const effects: Map<string, string> = new Map<string, string>([
        [ "🌊",  "wave"],
        [ "🌈", "rainbow"],
        [ "‼", "shake"],
        ["💫", "spin"],
        
    ])

    const properties = [
        {
            name: "--mov-y",
            syntax: "<length>",
            inherits: false,
            initialValue: "0px"
        },
        {
            name: "--rot-y",
            syntax: "<angle>",
            inherits: false,
            initialValue: "0deg"
        },
    ];

    return {
        name: "FancyText",
        textTransform(_ctx, src) {
            src = String(src)

            for (const [sym, effect] of effects) {
                const regex = new RegExp(`${sym}${sym}([^${sym}]+)${sym}${sym}`, "g")
                src = src.replace(regex, (value, ...[capture]) => {
                    return `<span class="ft-letters ft-${effect}">${capture}</span>`
                })
            }

            return src
        },
        externalResources() {
            return {
                js: [
                    {
                        loadTime: "afterDOMReady",
                        moduleType: "module",
                        contentType: "inline",
                        script: charming_js,
                    },
                ]
            }
        }
    }
}