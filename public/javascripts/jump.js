let name = null;
let isUploader = null;

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.detail-button').forEach(function (button) {
        button.addEventListener('click', function () {


            //var ID = button.closest('tr').rowIndex;

            name = prompt('Please enter your name：');
            // If no name is entered, it will prompt that a name needs to be entered
            if (name === null || name.trim() === '') {
                alert('Please enter your name to continue');
                return;
            }

            isUploader = confirm('Are you the uploader of this bird?');

            if (isUploader) {
                const password = prompt('Please enter your password：');
                if (password === '111') {
                    localStorage.setItem('username', name); // 将 uploader 的名字保存到 localStorage
                    localStorage.setItem('isUploader', true);
                    window.location.href = '/reviewPage';
                } else {
                    alert('Password error！');
                }
            } else {
                localStorage.setItem('username', name);
                localStorage.setItem('isUploader', false);
                window.location.href = '/reviewPage';
            }
        });
    });
});
