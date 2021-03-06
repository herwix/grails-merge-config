var Configuration = (function($) {

    var self = {},
        configsCount = null;

    var _create = function() {
        if (_validateFields(["#new-config-key", "#new-config-value"])) {
            var url = $("#configuration-save-url").html();
            var data = {
                key: $.trim($("#new-config-key").val()),
                value: $.trim($("#new-config-value").val()),
                type: $("#new-config-type").val(),
                description: $.trim($("#new-config-description").val())
            };

            _startCreateButton();
            $.ajax({ url: url, data: data, type: 'POST'}).done(function(response) {
                configsCount++;
                _clearFields();
                _appendToTable(response.data.config);
                _endCreateButton();
                _updateTable();
                _hideError();
            }).fail(function(response) {
                _showError(response.responseJSON.message);
                _endCreateButton();
            });
        }
    };

    self.remove = function(id) {
        if (confirm("Are you sure?")) {
            var url = $("#configuration-delete-url").html();
            $.ajax({ url: url + "/" + id, type: 'DELETE' }).done(function() {
                $("#config-" + id).remove();
                configsCount--;
                _updateTable();
            }).fail(function(response) {
                alert(response.responseJSON.message)
            });
        }
    };

    self.init = function(count) {
        configsCount = count;

        $("#configuration-create-button").on('click', function() {
            _create();
        });

        $(".configuration-delete").on('click', function() {
            var id = $(this).attr("data-config-id");
           _remove(id);
        });
    };

    var _updateTable = function() {
        if (configsCount > 0) {
            $("#no-config-records").hide();
            $("#config-table").show();
        } else {
            $("#no-config-records").show();
            $("#config-table").hide();
        }
    };

    var _validateFields = function(fields) {
        var valid = true;
        $.each(fields, function(i, val) {
            if ($.trim($(val).val()) === "") {
                $(val).focus();
                $(val).parent().addClass("has-error");
                valid = false;
                return false;
            } else {
                $(val).parent().removeClass("has-error");
            }
        });
        return valid;
    };

    var _startCreateButton = function() {
        var createButton = $("#configuration-create-button");
        createButton.attr("disabled", "disabled");
        createButton.html("Saving...");
    };

    var _endCreateButton = function() {
        var createButton = $("#configuration-create-button");
        createButton.removeAttr("disabled");
        createButton.html("Save");
    };

    var _clearFields = function() {
        $("#new-config-key").val("");
        $("#new-config-value").val("");
        $("#new-config-description").val("");
    };

    var _appendToTable = function(config) {
        var html = '' +
            '<tr id="config-' + config.id + '">' +
            '<td><strong>' + config.key + '</strong></td>' +
            '<td>' + config.value + '</td>' +
            '<td>' + config.description + '</td>' +
            '<td>' + $("#" + config.type.name).text() + '</td>' +
            '<td><a href="#" class="configuration-delete" onclick="Configuration.remove(' + config.id + ')">Delete</a></td>' +
            '</tr>';
        $("#config-table-body").append(html);
    };

    var _showError = function(message) {
        var error = $("#error");
        error.hide();
        error.children("p").first().empty().append(message);
        error.fadeIn(300);
        setTimeout(function() { error.fadeOut(300) }, 5000);
    };

    var _hideError = function() {
        $("#error").hide();
    };

    return self;

}(jQuery));