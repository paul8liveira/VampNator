(function() {

    var self = {
        init: function() {
            chrome.storage.sync.get({
                activate: true
            }, function (items) {
                console.log(items);
            });
        }
    };

    self.init();

})();