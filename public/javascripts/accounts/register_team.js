'use strict';

$(function () {
    $('#createRegisterTeam').submit(function (event) {
        event.preventDefault();

        var $form = $(this),
            term = $form.serialize(),
            url = '';

        var posting = $.post(url, term);

        posting.done(function (data) {
            window.history.go(-2);
        });
    });
});
