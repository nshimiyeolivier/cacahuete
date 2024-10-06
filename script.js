let participants = [];
let links = [];

document.getElementById('participantForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const numParticipants = document.getElementById('numParticipants').value;
    generateRegistrationLinks(numParticipants);
});

function generateRegistrationLinks(num) {
    links = [];
    for (let i = 1; i <= num; i++) {
        const link = `https://nshimiyeolivier.github.io/cacahuete/index.html/register?participant=${i}`;
        links.push(link);
    }
    displayLinks();
}

function displayLinks() {
    const linksContainer = document.getElementById('linksContainer');
    linksContainer.innerHTML = '';
    links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.textContent = link;
        linkElement.target = '_blank';
        linksContainer.appendChild(linkElement);
    });
    document.getElementById('registrationLinks').style.display = 'block';
}

document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    participants.push({ name, email });

    if (participants.length === links.length) {
        assignGifts();
    }
});

function assignGifts() {
    const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);
    participants.forEach((participant, index) => {
        const recipient = shuffledParticipants[index];
        sendEmail(participant.email, recipient.name);
    });
}

function sendEmail(to, recipientName) {
    const subject = encodeURIComponent("Votre partenaire de cadeau");
    const body = encodeURIComponent(`Vous allez offrir un cadeau à : ${recipientName}`);
    const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}
