using System.Web.Optimization;

namespace whereiskeithsrv
{
    public static class BundleConfig
    {
        public const string CssBundleVirtualPath = "~/Content/css";
        public const string ScriptBundleVirtualPath = "~/Content/js";

        public static void RegisterBundles(BundleCollection bundles)
        {
#if !DEBUG
            // Since web.config transforms don't work locally, manually override when not debug build as an alternative to allow testing optimizations
            BundleTable.EnableOptimizations = true;
#endif

            var cssBundle = new StyleBundle(CssBundleVirtualPath)
                .Include("~/Content/styles/layout.css")
                .Include("~/Content/styles/parking-spot-diagram.css")
                .Include("~/Content/styles/schedule.css")
            ;

            bundles.Add(cssBundle);

            var jsBundle = new ScriptBundle(ScriptBundleVirtualPath)
                .Include("~/Content/scripts/app.js")
            ;

            bundles.Add(jsBundle);
        }
    }
}