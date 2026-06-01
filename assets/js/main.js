const typingText = document.querySelector('.hero__subtitle');
const words = [
	'Python Backend Developer',
	"1C Specialist",
	'Django & FastAPI Developer',
	'Telegram Bot Developer'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
	const currentWord = words[wordIndex];
	if(isDeleting){
		typingText.textContent = currentWord.substring(0, charIndex-1);
		charIndex--;
	} else {
		typingText.textContent = currentWord.substring(0,charIndex + 1);
		charIndex ++;
	}

	if (!isDeleting && charIndex === currentWord.length) {
		isDeleting = true;
		setTimeout(type, 1500);
		return;
	}

	if(isDeleting && charIndex === 0){
		isDeleting = false;
		wordIndex = (wordIndex + 1) % words.length;
		
	}
	setTimeout(type, isDeleting ? 50 : 100);
}

type();

const observer = new IntersectionObserver((entries)=> {
	entries.forEach(entry => {
		if(entry.isIntersecting){
			entry.target.classList.add('visible');
		} else {
			entry.target.classList.remove('visible');
		}
	});
}, { threshold: 0.1, 
			rootMargin: '0px 0px -50px 0px'	
});

window.addEventListener('load', () => {
	document.querySelectorAll('.about, .projects, .contact').forEach(section => {
		observer.observe(section);
	})
})