
$(document).ready(function () {
    function updateElementIndex(el, prefix, ndx) {
        var formCount = parseInt($('#id_' + prefix + '_set-TOTAL_FORMS').val());
        var id_regex = new RegExp('(' + prefix + '_set-\\d+-)');
        var replacement = prefix + '_set-' + ndx + '-';
        if ($(el).attr("for")) $(el).attr("for", $(el).attr("for").replace(id_regex, replacement));
        if (el.id) el.id = el.id.replace(id_regex, replacement);
        if (el.name) el.name = el.name.replace(id_regex, replacement);
        var optionsbutton = $(".commands .command:last").find("#options0");
        var optionswell = $(".commands .command:last").find(".options0");
        optionsbutton.attr('id', "options" + formCount);
        optionswell.removeClass("options0").addClass( "options" + formCount);
    }

    function changeDeleteForms(el, prefix, formid) {
        var idstring = 'id_' + prefix + '_set-' + formid + '-DELETE';
        //$('<input>').attr({type: 'hidden', id: 'id_' + idstring, name: idstring}).appendTo('.command-delete');
        $('#' + idstring).prop('checked', true);
    }

    function deleteForm(btn, prefix) {
        var formCount = parseInt($('#id_' + prefix + '_set-TOTAL_FORMS').val());
        var delforms = parseInt($('.command-delete').length); // Get all the forms
        var totalForms = formCount - delforms;
        if (totalForms > 1) {
            // Delete the item/form
            $(btn).parents('.command').hide();
            $(btn).parents('.command').attr('class', 'command-delete');
            var dc = $(".command-delete");
            $(dc).children().children().children().children().children().each(function () {
                var formid = this.id.match(/\d+/g);
                changeDeleteForms(this, prefix, formid);
                //$(this).val("");
            });
            var forms = $('.commands .command'); // Get all the forms
            var formsdelete = $('.command-delete'); // Get all the forms
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
        var formCount = parseInt($('#id_' + prefix + '_set-TOTAL_FORMS').val());
        var maxCount = parseInt($('#id_' + prefix + '_set-MAX_NUM_FORMS').val());
        var forms = parseInt($('.command-delete').length); // Get all the forms
        var newcount = formCount + forms;
        // You can only submit a maximum of 10 todo items
        if (newcount < maxCount) {
            // Clone a form (without event handlers) from the first form
            var row = $("#command-template").clone();
            row.find('.bootstrap-select').remove();
            row.find('select').selectpicker();
            // Insert it after the last form
            $(row).removeAttr('id').hide().appendTo(".commands").slideDown(300);

            // Remove the bits we don't want in the new row/form
            // e.g. error messages
            $(".errorlist", row).remove();
            $(row).children().removeClass("error");

            // Relabel or rename all the relevant bits
            $(".commands .command:last *").each(function () {
                updateElementIndex(this, prefix, newcount);
            });

            // Add an event handler for the delete item/form link
            $(row).find(".delete").click(function () {
                return deleteForm(this, prefix);
            });
            // Update the total form count
            $("#id_" + prefix + "_set-TOTAL_FORMS").val(formCount + 1);
        } // End if
        else {
            alert("Sorry, you can only enter a maximum of 1000 items.");
        }
        return false;
    }
    // Register the click event handlers
    $("#add").on("click", function () {
        return addForm(this, "itemcommands");
    });

    $("#commandsform").on("click", ".delete", function(){
        return deleteForm(this, "itemcommands");
    });


    $("#addglobal").click(function () {
        return addForm(this, "globalcommands");
    });

    $("#globalform").on("click", ".deleteglobal", function(){
        return deleteForm(this, "globalcommands");
    });

    $("#addsalecommand").click(function () {
        return addForm(this, "salecommands");
    });

    $("#saleform").on("click", ".deletesalecommand", function(){
        return deleteForm(this, "salecommands");
    });


    $("#command-template").hide()
    $("#option-table").hide()
    $('.command input:checkbox').hide();
    $('.commandorder').hide();
    $('.option input:checkbox').hide();


    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    if ($('#globalform').length != 0){
        $("#globalform").sortable({
            items: "div.command",
            cursor: "move",
            handle: "button.commandhandle",
            cancel: "",
            update: function(event, ui) {
                var result_commands = $('#globalform').sortable('serialize');
                $.ajax({
                    type: "POST",
                    data: result_commands + '&csrfmiddlewaretoken=' + csrftoken + '&commands=true',
                    url: "/controlpanel/global/update/"
                });
            }
        });
    }

    if ($('#commandsform').length != 0){
        $("#commandsform").sortable({
            items: "div.command",
            cursor: "move",
            handle: "button.commandhandle",
            cancel: "",
            update: function(event, ui) {
                var result_commands = $('#commandsform').sortable('serialize');
                $.ajax({
                    type: "POST",
                    data: result_commands + '&csrfmiddlewaretoken=' + csrftoken + '&commands=true',
                    url: "/controlpanel/commands/update/"
                });
            }
        });
    }

    if ($('#gateways').length != 0){
        $("#gateways").sortable({
            items: "div.gateway",
            cursor: "move",
            handle: "button.gatewayhandle",
            cancel: "",
            placeholder: "sort_placeholder",
            update: function(event, ui) {
                var result_gateways = $('#gateways').sortable('serialize');
                $.ajax({
                    type: "POST",
                    data: result_gateways + '&csrfmiddlewaretoken=' + csrftoken + '&gateways=true',
                    url: "/controlpanel/gateway/update/"
                });
            }
        });
    }

    if ($('#modules').length != 0){
        $("#modules").sortable({
            items: "div.slide",
            cursor: "move",
            handle: "button.modhandle",
            cancel: "",
            placeholder: "sort_placeholder",
            update: function(event, ui) {
                var result_modules = $('#modules').sortable('serialize');
                $.ajax({
                    type: "POST",
                    data: result_modules + '&csrfmiddlewaretoken=' + csrftoken + '&modules=true',
                    url: "/controlpanel/module/update/"
                });
            }
        });
    }

    if ($('ul.items').length != 0){
        $("ul.items").sortable({
            connectWith: "ul.items",
            cursor: "move",
            items: "li.item",
            handle: "button.itemhandle",
            cancel: "",
            receive: function(event, ui) {
                var cat_id = this.id;
                var receiver_items = $(this).sortable('serialize');
                $.ajax({
                    type: "POST",
                    data: receiver_items + '&csrfmiddlewaretoken=' + csrftoken + '&items=true&catid='+cat_id,
                    url: "/controlpanel/items/update/"
                });
            },
            update: function(event, ui) {
                var result_items = $(this).sortable('serialize');
                $.ajax({
                    type: "POST",
                    data: result_items + '&csrfmiddlewaretoken=' + csrftoken + '&items=true',
                    url: "/controlpanel/items/update/"
                });
            }
        });
    }

    if ($('div.subcats').length != 0){
        $("div.subcats").sortable({
            connectWith: "div.subcats",
            items: "div.subcat",
            handle: "button.subcathandle",
            cancel: "",
            receive: function(event, ui) {
                var cat_id = this.id;
                var receiver_subcats = $(this).sortable('serialize');
                $.ajax({
                    type: "POST",
                    data: receiver_subcats + '&csrfmiddlewaretoken=' + csrftoken + '&subcats=true&catid='+cat_id,
                    url: "/controlpanel/subcategories/update/"
                });
            },
            update: function(event, ui) {
                var result_subcats = $(this).sortable('serialize');
                $.ajax({
                    type: "POST",
                    data: result_subcats + '&csrfmiddlewaretoken=' + csrftoken + '&subcats=true',
                    url: "/controlpanel/subcategories/update/"
                });
            }
        });
    }


    if ($('div.categories').length != 0){
        $("div.categories").sortable({
            items: "div.category",
            handle: "button.cathandle",
            cancel: "",
            update: function(event, ui) {
                var result_cat = $('div.categories').sortable('serialize');
                $.ajax({
                    type: "POST",
                    data: result_cat + '&csrfmiddlewaretoken=' + csrftoken + '&categories=true',
                    url: "/controlpanel/categories/update/"
                });
            }
        });
    }

    $('.deleteitemimage').click(function(){
        $.ajax({
            url: '/controlpanel/item/'+ this.id + '/deleteimage/',
            data: '&csrfmiddlewaretoken=' + csrftoken,
            type: 'POST'
        });
    });
    $('.deletemarketlogo').click(function(){
        $.ajax({
            url: '/controlpanel/design/market/'+ this.id + '/deletelogo/',
            data: '&csrfmiddlewaretoken=' + csrftoken,
            type: 'POST'
        });
    });
    $('.deletemarketcover').click(function(){
        $.ajax({
            url: '/controlpanel/design/market/'+ this.id + '/deletecover/',
            data: '&csrfmiddlewaretoken=' + csrftoken,
            type: 'POST'
        });
    });
    $('.deletemarketbg').click(function(){
        $.ajax({
            url: '/controlpanel/design/market/'+ this.id + '/deletebg/',
            data: '&csrfmiddlewaretoken=' + csrftoken,
            type: 'POST'
        });
    });

    if ($('.datepicker').length != 0){
        $(".datepicker").datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            todayBtn: 'linked',
            autoclose: true,
            date: "{{ date }}"
        });
    }
    $('select').selectpicker();

    if ($("#id_options").val() == '1') {
        $("#id_query").show();
        $("#id_items").hide();
        $("#id_categories").hide();
        $("#id_servers").hide();
    }
    else  if ($("#id_options").val() == '2') {
        $("#id_query").hide();
        $("#id_items").hide();
        $("#id_categories").hide();
        $("#id_servers").hide();
    }
    else  if ($("#id_options").val() == '3') {
        $("#id_query").hide();
        $("#id_items").hide();
        $("#id_categories").hide();
        $("#id_servers").hide();
    }
    else  if ($("#id_options").val() == '4') {
        $("#id_query").hide();
        $("#id_items").hide();
        $("#id_categories").hide();
        $("#id_servers").hide();
    }
    else  if ($("#id_options").val() == '5') {
        $("#itemlabel").hide();
        $("#itemform").hide();
        $("#catlabel").hide();
        $("#catform").hide();
    }
    else  if ($("#id_options").val() == '6') {
        $("#itemlabel").hide();
        $("#itemform").hide();
        $("#catlabel").hide();
        $("#catform").hide();
    }
    else  if ($("#id_options").val() == '7') {
        $("#itemlabel").hide();
        $("#itemform").hide();
        $("#catlabel").hide();
        $("#catform").hide();
    }
    else  if ($("#id_options").val() == '8') {
        $("id_query").hide();
        $("#id_servers").hide();
        $("#id_categories").hide();
        $("#id_items").show();
    }
    else  if ($("#id_options").val() == '9') {
        $("#itemlabel").hide();
        $("#itemform").hide();
        $("#catlabel").hide();
        $("#catform").hide();
    }
    else {
        $("#itemlabel").hide();
        $("#itemform").hide();
        $("#catlabel").hide();
        $("#catform").hide();
    }

    $("#id_options").change(function() {
        if ($(this).val() == '1') {
            $("#id_query").show();
            $("#id_items").hide();
            $("#id_categories").hide();
            $("#id_servers").hide();
        }
        else  if ($(this).val() == '2') {
            $("#id_query").show();
            $("#id_items").hide();
            $("#id_categories").hide();
            $("#id_servers").hide();
        }
        else  if ($(this).val() == '3') {
            $("#id_query").show();
            $("#id_items").hide();
            $("#id_categories").hide();
            $("#id_servers").hide();
        }
        else  if ($(this).val() == '4') {
            $("#id_query").show();
            $("#id_items").hide();
            $("#id_categories").hide();
            $("#id_servers").hide();
        }
        else  if ($(this).val() == '5') {
            $("#itemlabel").show();
            $("#itemform").hide();
            $("#catlabel").hide();
            $("#catform").hide();
        }
        else  if ($(this).val() == '6') {
            $("#itemlabel").hide();
            $("#itemform").hide();
            $("#catlabel").hide();
            $("#catform").hide();
        }
        else  if ($(this).val() == '7') {
            $("#itemlabel").hide();
            $("#itemform").hide();
            $("#catlabel").hide();
            $("#catform").hide();
        }
        else  if ($(this).val() == '8') {
            $("id_query").hide();
            $("#id_servers").hide();
            $("#id_categories").hide();
            $("#id_items").show();
        }
        else  if ($(this).val() == '9') {
            $("id_query").hide();
            $("#id_servers").hide();
            $("#id_items").hide();
            $("#id_categories").show();
        }
        else {
            $("#itemlabel").hide();
            $("#itemform").hide();
            $("#catlabel").hide();
            $("#catform").hide();
        }
    });

    $("a[data-toggle='popover']").popover(
        {
            container: "body",
            trigger: "hover"
        });

    $("a[data-toggle='popover']").on("mouseout", function(e)
    {
        $(this).popover("hide");
    });

    if ($('#editor').length != 0){
        var editor = ace.edit("editor");
        var textarea = $('textarea[name="customcss"]').hide();
        editor.setTheme("ace/theme/chrome");
        editor.getSession().setMode("ace/mode/css");
        editor.getSession().setValue(textarea.val());
        editor.getSession().on('change', function(){
            textarea.val(editor.getSession().getValue());
        });
    }

    if ($('#templateeditor').length != 0){
        var editor = ace.edit("templateeditor");
        var textarea = $('textarea[name="template"]').hide();
        editor.setTheme("ace/theme/chrome");
        editor.getSession().setMode("ace/mode/html");
        editor.getSession().setValue(textarea.val());
        editor.getSession().on('change', function(){
            textarea.val(editor.getSession().getValue());
        });
    }

    if ($('.commandoptions').length != 0){
        $('.commandoptions').hide();
        $("#commandsform").on("click", ".showoptions", function(){
            if($("."+this.id).is(':visible')){
                $("."+this.id).hide();
            } else if ($("."+this.id).is(':hidden')) {
                $("."+this.id).show();
            };
        });
    }
    if ($('.commandoptions').length != 0){
        $('.commandoptions').hide();
        $("#globalform").on("click", ".showoptions", function(){
            if($("."+this.id).is(':visible')){
                $("."+this.id).hide();
            } else if ($("."+this.id).is(':hidden')) {
                $("."+this.id).show();
            };
        });
    }

    if ($('.commandoptions').length != 0){
        $('.commandoptions').hide();
        $("#saleform").on("click", ".showoptions", function(){
            if($("."+this.id).is(':visible')){
                $("."+this.id).hide();
            } else if ($("."+this.id).is(':hidden')) {
                $("."+this.id).show();
            };
        });
    }

    function updateOptionIndex(el, prefix, ndx) {
        var formCount = parseInt($('#id_' + prefix + '_set-TOTAL_FORMS').val());
        var id_regex = new RegExp('(' + prefix + '_set-\\d+-)');
        var replacement = prefix + '_set-' + ndx + '-';
        if ($(el).attr("for")) $(el).attr("for", $(el).attr("for").replace(id_regex, replacement));
        if (el.id) el.id = el.id.replace(id_regex, replacement);
        if (el.name) el.name = el.name.replace(id_regex, replacement);
    }

    function changeDeleteOption(el, prefix, formid) {
        var idstring = 'id_' + prefix + '_set-' + formid + '-DELETE';
        //$('<input>').attr({type: 'hidden', id: 'id_' + idstring, name: idstring}).appendTo('.command-delete');
        $('#' + idstring).prop('checked', true);
    }

    function deleteOption(btn, prefix) {
        var formCount = parseInt($('#id_' + prefix + '_set-TOTAL_FORMS').val());
        if (formCount > 1) {
            // Delete the item/form
            $(btn).parents('.option').hide();
            $(btn).parents('.option').attr('class', 'option-delete');
            var dc = $(".option-delete");
            $(dc).children().children().children().each(function () {
                var formid = this.id.match(/\d+/g);
                changeDeleteOption(this, prefix, formid);
                //$(this).val("");
            });
            var forms = $('#options .option'); // Get all the forms
            var formsdelete = $('.option-delete'); // Get all the forms
            var fl = parseInt(forms.length);
            var fdl = parseInt(formsdelete.length);
            var finalcount = fl + fdl
            // Update the total number of forms (1 less than before)
            //$('#id_' + prefix + '_set-TOTAL_FORMS').val(forms.length);
            var i = 0;
        } // End if
        else {
            alert("Please enter atleast 1 command for this item.");
        }
        return false;
    }

    function addOption(btn, prefix) {
        var formCount = parseInt($('#id_' + prefix + '_set-TOTAL_FORMS').val());
        var maxCount = parseInt($('#id_' + prefix + '_set-MAX_NUM_FORMS').val());
        var forms = parseInt($('.option-delete').length); // Get all the forms
        var newcount = formCount + forms;
        // You can only submit a maximum of 10 todo items
        if (newcount < maxCount) {
            // Clone a form (without event handlers) from the first form
            var row = $("#option-template").clone();
            row.find('.bootstrap-select').remove();
            row.find('select').selectpicker();
            // Insert it after the last form
            $(row).removeAttr('id').hide().appendTo("#options").slideDown(300);
            // Remove the bits we don't want in the new row/form
            // e.g. error messages
            $(".errorlist", row).remove();
            $(row).children().removeClass("error");

            // Relabel or rename all the relevant bits
            $("#options .option:last *").each(function () {
                updateOptionIndex(this, prefix, newcount);
            });

            // Add an event handler for the delete item/form link
            $(row).find(".delete").click(function () {
                return deleteOption(this, prefix);
            });
            // Update the total form count
            $("#id_" + prefix + "_set-TOTAL_FORMS").val(newcount + 1);
        } // End if
        else {
            alert("Sorry, you can only enter a maximum of 1000 options.");
        }
        return false;
    }


    $("#addoption").click(function () {
        return addOption(this, "variableoption");
    });

    $("#options").on("click", ".deleteoption", function(){
        return deleteOption(this, "variableoption");
    });
})
