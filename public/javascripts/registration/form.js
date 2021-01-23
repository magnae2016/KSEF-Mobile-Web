'use strict';

function removeRider(element) {
    element.parentNode.remove();
}

$(function () {
    const $Riders = $('#Riders');
    const $AddItem = $('#AddItem');
    const createTemplate = (id) => {
        const template = `
            <div class="Rider mb-3 position-relative" data-id="${id}">
                <h5 class="fs-6 mb-3 fw-600 pt-3">라이더 ${id}</h5>
                <button type="button" 
                    class="btn mb-0 pt-3 px-0 lh-1 h6 fw-normal text-decoration-underline text-gray-600 position-absolute top-0 end-0"
                    onclick="removeRider(this)">삭제하기</button>
                <div class="row g-2 my-0">
                    <div class="col-5 m-0">
                        <div class="form-floating pb-2 mb-1 ">
                            <input type="text" name="rider${id}_name"
                                class="form-control bg-transparent rounded-0 border-0 border-bottom border-1 px-0 h5 mb-0 border-gray-200 "
                                placeholder="성명" autocomplete="off" required="">
                            <label class="h5 px-0 pt-4 pb-2 mb-0 h-auto text-gray-300">성명</label>
                            <div class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="col-7 m-0">
                        <div class="form-floating pb-2 mb-1 ">
                            <input type="tel" name="rider${id}_phone"
                                class="form-control bg-transparent rounded-0 border-0 border-bottom border-1 px-0 h5 mb-0 border-gray-200 "
                                placeholder="연락처" autocomplete="off" required="">
                            <label class="h5 px-0 pt-4 pb-2 mb-0 h-auto text-gray-300">연락처</label>
                            <div class="invalid-feedback"></div>
                        </div>
                    </div>
                </div>
                <div class="form-floating pb-2 mb-1 ">
                    <input type="text" name="rider${id}_RRN"
                        class="form-control bg-transparent rounded-0 border-0 border-bottom border-1 px-0 h5 mb-0 border-gray-200 "
                        placeholder="주민번호" autocomplete="off" required="">
                    <label class="h5 px-0 pt-4 pb-2 mb-0 h-auto text-gray-300">주민번호</label>
                    <div class="invalid-feedback"></div>
                </div>
                <div class="pb-2 mb-1">
                    <h5 class="fs-6 pt-2 mt-1 mb-3 fw-600 text-gray-300">KIC 라이선스 유무 (필수)</h5>
                    <div class="row g-1 btn-group w-100">
                        <div class="col-6">
                            <div class="d-grid">
                                <input type="radio" class="btn-check" name="rider${id}_has_KIC" 
                                    id="btnradio${
                                        id * 10 + 2
                                    }" autocomplete="off"
                                    value="Y" required>
                                <label class="btn btn-outline-dark btn-lg rounded-0 position-relative border-gray-100"
                                    for="btnradio${id * 10 + 2}">
                                    <small class="text-gray-600 fw-normal lh-base fs-6">소지 함</small>
                                </label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-grid">
                                <input type="radio" class="btn-check" name="rider${id}_has_KIC" 
                                    id="btnradio${
                                        id * 10 + 3
                                    }" autocomplete="off"
                                    value="N">
                                <label class="btn btn-outline-dark btn-lg rounded-0 position-relative border-gray-100"
                                    for="btnradio${id * 10 + 3}">
                                    <small class="text-gray-600 fw-normal lh-base fs-6">소지하지 않음</small>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pb-2 mb-1">
                    <h5 class="fs-6 pt-2 mt-1 mb-3 fw-600 text-gray-300">경기이력과 순위 (선택)</h5>
                    <textarea name="rider${id}_history"
                        class="form-control bg-transparent rounded-0 border-1 p-2 fs-6 mb-0 border-gray-200"
                        style="height: 100px"></textarea>
                </div>
            </div>`;
        return template;
    };

    $AddItem.click(function () {
        const exists = [];
        const count = $('.Rider').length;
        if (count > 3) {
            window.alert('더이상 라이더를 추가할 수 없습니다.');
            return;
        }

        $('.Rider').each(function (index, element) {
            const id = $(element).data('id');
            exists.push(id);
        });
        let difference = [1, 2, 3, 4].filter((x) => !exists.includes(x));
        const next = Math.min.apply(null, difference);
        const template = createTemplate(next);
        $Riders.append(template);
    });
});
