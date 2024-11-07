var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        this.currentResume = null;
        this.form = document.getElementById('resumeForm');
        this.resumeOutput = document.getElementById('resumeOutput');
        this.resumeContent = document.getElementById('resumeContent');
        this.shareButton = document.getElementById('shareButton');
        this.downloadButton = document.getElementById('downloadButton');
        this.editButton = document.getElementById('editButton');
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.shareButton.addEventListener('click', this.shareResume.bind(this));
        this.downloadButton.addEventListener('click', this.downloadResume.bind(this));
        this.editButton.addEventListener('click', this.editResume.bind(this));
    }
    ResumeBuilder.prototype.handleSubmit = function (e) {
        e.preventDefault();
        var formData = new FormData(this.form);
        this.currentResume = {
            username: formData.get('username'),
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            experience: formData.get('experience'),
            education: formData.get('education'),
            skills: formData.get('skills')
        };
        this.generateResume(this.currentResume);
    };
    ResumeBuilder.prototype.generateResume = function (resume) {
        this.resumeContent.innerHTML = "\n            <h2>".concat(resume.fullName, "</h2>\n            <p>Email: ").concat(resume.email, "</p>\n            <h3>Experience</h3>\n            <p>").concat(resume.experience, "</p>\n            <h3>Education</h3>\n            <p>").concat(resume.education, "</p>\n            <h3>Skills</h3>\n            <p>").concat(resume.skills, "</p>\n        ");
        this.resumeOutput.classList.remove('hidden');
        this.form.classList.add('hidden');
    };
    ResumeBuilder.prototype.shareResume = function () {
        if (!this.currentResume)
            return;
        var shareUrl = "".concat(window.location.origin, "/").concat(this.currentResume.username);
        alert("Share this URL: ".concat(shareUrl));
    };
    ResumeBuilder.prototype.downloadResume = function () {
        if (!this.currentResume)
            return;
        var element = this.resumeContent;
        window.html2pdf().from(element).save("".concat(this.currentResume.username, "_resume.pdf"));
    };
    ResumeBuilder.prototype.editResume = function () {
        if (!this.currentResume)
            return;
        document.getElementById('username').value = this.currentResume.username;
        document.getElementById('fullName').value = this.currentResume.fullName;
        document.getElementById('email').value = this.currentResume.email;
        document.getElementById('experience').value = this.currentResume.experience;
        document.getElementById('education').value = this.currentResume.education;
        document.getElementById('skills').value = this.currentResume.skills;
        this.resumeOutput.classList.add('hidden');
        this.form.classList.remove('hidden');
    };
    return ResumeBuilder;
}());
new ResumeBuilder();
