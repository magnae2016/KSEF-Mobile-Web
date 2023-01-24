'use strict';

$(function () {
    $('#createRegisterTeam').submit(function (event) {
        event.preventDefault();

        var $form = $(this),
            term = $form.serialize(),
            url = '';
        var searchParams = new URLSearchParams(term);
        if (!searchParams.get('team_id')) {
            window.alert('관리자가 팀을 등록한 이후, 팀 선택을 진행해주세요.');
            return;
        }
        var posting = $.post(url, term);

        posting.done(function (data) {
            window.history.go(-2);
        });
    });

    $("input[name='team_id']").change(function (params) {
        setTimeout(() => {
            $('html, body').animate(
                {
                    scrollTop: document.body.scrollHeight,
                },
                800
            );
        }, 500);
    });
});
