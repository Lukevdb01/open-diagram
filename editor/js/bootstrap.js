// Global config
const urlParams = Object.fromEntries(
    new URLSearchParams(window.location.search)
);

// mxGraph expects this global.
window.mxLoadResources = false;

// Script loader
const scripts = [
    "editor/js/Init.js",
    "utils/deflate/pako.min.js",
    "utils/deflate/base64.js",
    "utils/jscolor/jscolor.js",
    "utils/sanitizer/sanitizer.min.js",
    "./core/library/mxClient.js",
    "editor/js/EditorUi.js",
    "editor/js/Editor.js",
    "editor/js/Sidebar.js",
    "editor/js/Graph.js",
    "editor/js/Format.js",
    "editor/js/Shapes.js",
    "editor/js/Actions.js",
    "editor/js/Menus.js",
    "editor/js/Toolbar.js",
    "editor/js/Dialogs.js"
];

const loadScript = (src) =>
    new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src = src;
        script.async = false; // preserve execution order
        script.onload = resolve;
        script.onerror = () =>
            reject(new Error(`Failed to load "${src}"`));

        document.head.appendChild(script);
    });

const loadScripts = async () => {
    for (const src of scripts) {
        await loadScript(src);
    }
};

// Editor bootstrap
const initializeEditor = () => {
    const originalInit = EditorUi.prototype.init;

    EditorUi.prototype.init = function (...args) {
        originalInit.apply(this, args);

        this.actions.get("export").setEnabled(false);

        const backendEnabled = urlParams.backend === "1";

        if (!Editor.useLocalStorage && backendEnabled) {
            mxUtils.post(
                OPEN_URL,
                "",
                mxUtils.bind(this, (req) => {
                    const enabled = req.getStatus() !== 404;

                    this.actions
                        .get("open")
                        .setEnabled(enabled || Graph.fileSupport);

                    this.actions
                        .get("import")
                        .setEnabled(enabled || Graph.fileSupport);

                    this.actions.get("save").setEnabled(enabled);
                    this.actions.get("saveAs").setEnabled(enabled);
                    this.actions.get("export").setEnabled(enabled);
                })
            );
        }
    };

    // Disable fallback language bundles
    mxResources.loadDefaultBundle = false;

    const bundle =
        mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ??
        mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

    mxUtils.getAll(
        [bundle, `${STYLE_PATH}/default.xml`],
        ([resourceBundle, defaultStyle]) => {
            mxResources.parse(resourceBundle.getText());

            const themes = {
                [Graph.prototype.defaultThemeName]:
                    defaultStyle.getDocumentElement()
            };

            new EditorUi(
                new Editor(urlParams.chrome === "0", themes)
            );
        },
        () => {
            document.body.innerHTML = `
                <div style="margin-top:10%; text-align: center;">
                    Error loading resource files.<br>
                    Please check the browser console.
                </div>
            `;
        }
    );
};

// start app
(async () => {
    try {
        await loadScripts();
        initializeEditor();
    } catch (error) {
        console.error(error);

        document.body.innerHTML = `
            <div style="margin-top:10%; text-align: center;">
                ${error.message}
            </div>
        `;
    }
})();