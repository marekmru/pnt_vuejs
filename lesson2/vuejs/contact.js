const app = Vue.createApp({
    data() {
        return {
            yourName: null,
            yourEmail: null,
            subject: null,
            message: null,
            submitted: false,

            errors: []
        }
    },
    computed: {
        validWords: function () {
            return this.computedWords >= 2 && this.computedWords <= 12
        },
        computedWords: function () {
            if (this.message === '' || this.message == null) {
                return 0
            }
            return (this.message || '').split(' ').length
        },
        computedName: function () {
            return this.yourName || 'No name'
        },
        computedEmail: function () {
            return this.yourEmail || 'No name'
        }
    },
    methods: {
        sendForm(event) {
            this.errors = []
            if (this.validWords && this.yourName.length && this.yourEmail.length) {
                const data = {
                    username: this.computedName,
                    email: this.computedEmail,
                    subject: this.subject,
                    message: this.message
                 };
                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => response.json())
                    .then(data => {
                        this.submitted = true
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        this.errors.push(error)
                        console.error('Error:', error);
                    });
                return false
            }

            if (!this.validWords) {
                this.errors.push('Message must be between 2 and 12 words')
            }
            if (!this.yourName || this.yourName.length === 0) {
                this.errors.push('You must enter your name')
            }
            if (!this.subject || this.subject.length === 0) {
                this.errors.push('You must enter a subject')
            }
            if (!this.yourEmail || this.yourEmail.length === 0) {
                this.errors.push('You must enter your email')
            }
        }
    }
})

app.mount('#vue-contact-widget')
