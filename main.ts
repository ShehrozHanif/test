interface Resume {
    username: string;
    fullName: string;
    email: string;
    experience: string;
    education: string;
    skills: string;
}

class ResumeBuilder {
    private form: HTMLFormElement;
    private resumeOutput: HTMLElement;
    private resumeContent: HTMLElement;
    private shareButton: HTMLButtonElement;
    private downloadButton: HTMLButtonElement;
    private editButton: HTMLButtonElement;
    private currentResume: Resume | null = null;

    constructor() {
        this.form = document.getElementById('resumeForm') as HTMLFormElement;
        this.resumeOutput = document.getElementById('resumeOutput') as HTMLElement;
        this.resumeContent = document.getElementById('resumeContent') as HTMLElement;
        this.shareButton = document.getElementById('shareButton') as HTMLButtonElement;
        this.downloadButton = document.getElementById('downloadButton') as HTMLButtonElement;
        this.editButton = document.getElementById('editButton') as HTMLButtonElement;

        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.shareButton.addEventListener('click', this.shareResume.bind(this));
        this.downloadButton.addEventListener('click', this.downloadResume.bind(this));
        this.editButton.addEventListener('click', this.editResume.bind(this));
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        const formData = new FormData(this.form);
        this.currentResume = {
            username: formData.get('username') as string,
            fullName: formData.get('fullName') as string,
            email: formData.get('email') as string,
            experience: formData.get('experience') as string,
            education: formData.get('education') as string,
            skills: formData.get('skills') as string
        };
        this.generateResume(this.currentResume);
    }

    private generateResume(resume: Resume): void {
        this.resumeContent.innerHTML = `
            <h2>${resume.fullName}</h2>
            <p>Email: ${resume.email}</p>
            <h3>Experience</h3>
            <p>${resume.experience}</p>
            <h3>Education</h3>
            <p>${resume.education}</p>
            <h3>Skills</h3>
            <p>${resume.skills}</p>
        `;
        this.resumeOutput.classList.remove('hidden');
        this.form.classList.add('hidden');
    }

    private shareResume(): void {
        if (!this.currentResume) return;
        const shareUrl = `${window.location.origin}/${this.currentResume.username}`;
        alert(`Share this URL: ${shareUrl}`);
    }

    private downloadResume(): void {
        if (!this.currentResume) return;
        const element = this.resumeContent;
        (window as any).html2pdf().from(element).save(`${this.currentResume.username}_resume.pdf`);
    }

    private editResume(): void {
        if (!this.currentResume) return;

        (document.getElementById('username') as HTMLInputElement).value = this.currentResume.username;
        (document.getElementById('fullName') as HTMLInputElement).value = this.currentResume.fullName;
        (document.getElementById('email') as HTMLInputElement).value = this.currentResume.email;
        (document.getElementById('experience') as HTMLTextAreaElement).value = this.currentResume.experience;
        (document.getElementById('education') as HTMLTextAreaElement).value = this.currentResume.education;
        (document.getElementById('skills') as HTMLTextAreaElement).value = this.currentResume.skills;

        this.resumeOutput.classList.add('hidden');
        this.form.classList.remove('hidden');
    }
}

new ResumeBuilder();