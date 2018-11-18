var utils = (function () {
    return {
        remove: function (arr, value) {
            var index = arr.findIndex(function (item) { return item === value });

            if (index === -1) {
                return;
            }

            arr.splice(index, 1);
        },
        createRow: function (elementsTags, values) {
            var elements = elementsTags
                .map(function (tag, index) {
                    var element = document.createElement(tag);

                    if (tag === 'button') {
                        element.addEventListener('click', values[index].handler);
                    }

                    element.innerHTML = values[index].text || values[index];
                    element.className = 'value';

                    return element;
                });
            var wrapper = document.createElement('div');

            elements.forEach(function (element) {
                wrapper.appendChild(element);
            });

            return wrapper;
        }
    }
})();