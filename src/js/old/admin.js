
$(document).ready(function () {
    function updateElementIndex(el, prefix, ndx) {
        var formCount = parseInt($('#id_' + prefix + '-TOTAL_FORMS').val());
        var id_regex = new RegExp('(' + prefix + '-\\d+-)');
        var replacement = prefix + '-' + ndx + '-';
        if ($(el).attr("for")) $(el).attr("for", $(el).attr("for").replace(id_regex, replacement));
        if (el.id) el.id = el.id.replace(id_regex, replacement);
        if (el.name) el.name = el.name.replace(id_regex, replacement);
        var optionsbutton = $(".payment-definitions .payment-definition:last").find("#options0");
        var optionswell = $(".payment-definitions .payment-definition:last").find(".options0");
        optionsbutton.attr('id', "options" + formCount);
        optionswell.removeClass("options0").addClass("options" + formCount);
    }

    function changeDeleteForms(el, prefix, formid) {
        var idstring = 'id_' + prefix + '-' + formid + '-DELETE';
        //$('<input>').attr({type: 'hidden', id: 'id_' + idstring, name: idstring}).appendTo('.command-delete');
        $('#' + idstring).prop('checked', true);
    }

    function deleteForm(btn, prefix) {
        var formCount = parseInt($('#id_' + prefix + '-TOTAL_FORMS').val());
        var delforms = parseInt($('.payment-delete').length); // Get all the forms
        var totalForms = formCount - delforms;
        if (totalForms > 1) {
            // Delete the item/form
            $(btn).parents('.payment-definition').hide();
            $(btn).parents('.payment-definition').attr('class', 'payment-delete');
            var dc = $(".payment-delete");
            $(dc).children().children().children().children().children().each(function () {
                var formid = this.id.match(/\d+/g);
                changeDeleteForms(this, prefix, formid);
                //$(this).val("");
            });
            var forms = $('.payment-definitions .payment-definition'); // Get all the forms
            var formsdelete = $('.payment-delete'); // Get all the forms
            var fl = parseInt(forms.length);
            var fdl = parseInt(formsdelete.length);
            var finalcount = fl + fdl
            // Update the total number of forms (1 less than before)
            //$('#id_' + prefix + '_set-TOTAL_FORMS').val(forms.length);
            var i = 0;
        } // End if
        return false;
    }

    function addForm(btn, prefix) {
        var formCount = parseInt($('#id_' + prefix + '-TOTAL_FORMS').val());
        var maxCount = parseInt($('#id_' + prefix + '-MAX_NUM_FORMS').val());
        var forms = parseInt($('.payment-delete').length); // Get all the forms
        var newcount = formCount + forms;
        // You can only submit a maximum of 10 todo items
        if (newcount < maxCount) {
            // Clone a form (without event handlers) from the first form
            var row = $("#payment-template").clone();
            row.find('.bootstrap-select').remove();
            row.find('select').selectpicker();
            // Insert it after the last form
            $(row).removeAttr('id').hide().appendTo(".payment-definitions").slideDown(300);

            // Remove the bits we don't want in the new row/form
            // e.g. error messages
            $(".errorlist", row).remove();
            $(row).children().removeClass("error");

            // Relabel or rename all the relevant bits
            $(".payment-definitions .payment-definition:last *").each(function () {
                updateElementIndex(this, prefix, newcount);
            });

            // Add an event handler for the delete item/form link
            $(row).find(".delete").click(function () {
                return deleteForm(this, prefix);
            });
            // Update the total form count
            $("#id_" + prefix + "-TOTAL_FORMS").val(formCount + 1);
        } // End if
        else {
            alert("Sorry, you can only enter a maximum of 1000 items.");
        }
        return false;
    }

    // Register the click event handlers
    $("#billing-form").on("click", ".add", function () {
        return addForm(this, "form");
    });

    $("#payment-definitions").on("click", ".delete", function () {
        return deleteForm(this, "form");
    });

    $("#payment-template").hide()
    $('.payment-definition input:checkbox').hide();
});
