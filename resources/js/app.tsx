import "../css/app.css";
import "react-sliding-pane/dist/react-sliding-pane.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import Layout from "@/Layouts/Layout";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title: any) => `${title} - ${appName}`,
    resolve: async (name: any) => {
        const page: any = await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        );

        page.default.layout ??= Layout;

        return page;
    },
    setup({ el, App, props }: any) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
