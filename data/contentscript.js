(function ($) {
    self.on('message', function (config) {
        $.each(config.storage, function (allowedHost, enabled) {
            if (window.frameElement === null && enabled && window.location.hostname.indexOf(allowedHost) != -1 && document.location.href.toLowerCase().indexOf("es=off") === -1) {
                $("body").eliminatorSlajdow({
                    scrollableImageContainer: (config.storage.scrollableImageContainer === "on"),
                    spinningIconUrl: config.spinnerImgUrl,
                    facebookIconUrl: config.facebookIconUrl,
                    esLogoUrl: config.esLogoUrl,
                    cssPath: config.cssUrl,
                    facebookUrl: "https://www.facebook.com/eliminator-slajdow?ref=ff.extension",
                    bugReportUrl: "https://eliminator-slajdow.sugester.pl/?ref=ff.extension",
                    trackingCallback: function (category, action) {
                        console.log("Tracking not implemented in FF");
                    }
                });

                /* hack dla FF */
                if ($("div.PopupWielkosc div.ZdjecieGaleriaMaxWielkosc").length > 0) {
                    $("body, html").css("overflow", "auto");
                }
                return false;
            }
        });
    });
})(jQuery.noConflict(true));