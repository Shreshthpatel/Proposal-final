
    let msg = [
        { text: "Hi ######," },
        { text: "Mujhe aapse bahut samay se kuch kehna tha" },
        { text: "Aaj main apko batane ja raha hun " },
       
        { text: "Meri har subah sirf aapse shuru hoti hai 💖", gif: "gif1.gif" },
        { text: "Aapke bina adhura hoon, jaise chaand bina raat 🎫", gif: "gif2.gif" },
        { text: "Mera dil sirf aapke liye dhadakta hai ❤️", gif: "gif3.gif" }
    ];

    let currentIndex = 0;
    let typingInstance = null;

    function startApp() {
        document.getElementById("startPage").style.display = "none";
        document.getElementById("shayariPage").style.display = "block";
        document.getElementById("backgroundMusic").play();
        currentIndex = 0;
        let shayariTextElem = document.getElementById("msg");
        shayariTextElem.style.opacity = 0;
        if (typingInstance) {
            typingInstance.cancel();
        }
        typingInstance = ty(msg[currentIndex].text, "msg", function () {
            if (msg[currentIndex].gif) {
                document.getElementById("gifImage").src = msg[currentIndex].gif;
                document.getElementById("gifBox").style.display = "block";
            } else {
                document.getElementById("gifBox").style.display = "none";
            }
            shayariTextElem.style.animation = "fadeIn 1s forwards";
        });
    }

    function updateShayari() {
        let shayariTextElem = document.getElementById("msg");
        shayariTextElem.style.opacity = 0;
        ty(msg[currentIndex].text, "msg", function () {
            if (msg[currentIndex].gif) {
                document.getElementById("gifImage").src = msg[currentIndex].gif;
                document.getElementById("gifBox").style.display = "block";
            } else {
                document.getElementById("gifBox").style.display = "none";
            }
            shayariTextElem.style.animation = "fadeIn 1s forwards";
        });
    }

    function showNextShayari() {
        currentIndex++;
        if (currentIndex < msg.length) {
            updateShayari();
        } else {
            showProposal();
        }
    }

    function showProposal() {
        document.getElementById("shayariPage").style.display = "none";
        document.getElementById("proposalPage").style.display = "block";
        twe("Kya aap Meri Ardhangini banengi? 💍", "proposalText", function () {
            document.getElementById("backgroundMusic").src = "propose_lot.mp3";
            document.getElementById("backgroundMusic").play();
        });
    }

    function twe(text, elementId, callback) {
        let i = 0;
        let speed = 50;
        document.getElementById(elementId).innerHTML = "";
        function type() {
            if (i < text.length) {
                document.getElementById(elementId).innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                callback();
            }
        }
        type();
    }

    function ty(text, elementId, callback) {
        let i = 0;
        let speed = 50;
        let typingTimeout;
        const element = document.getElementById(elementId);
        element.innerHTML = "";
        if (text.length === 0) {
            callback();
            return {
                cancel: () => { }
            };
        }
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                typingTimeout = setTimeout(type, speed);
            } else {
                callback();
            }
        }
        type();
        return {
            cancel: () => clearTimeout(typingTimeout)
        };
    }

    function sendResponse(response) {
        if (response === "yes") {
            showPopup();
            sendTelegramMessage("Someone said Yes to the proposal! 💖");
        } else {
            
            let message = "She selected NO 💔";
            noshowPopup();
            
            document.getElementById("backgroundMusic").src = "no.mp3";
            document.getElementById("backgroundMusic").play();
            sendTelegramMessage(message);
        }
    }

    const popupModal = document.getElementById('popupModal');
    const popupMessage = document.getElementById('popupMessage');
    const popupNextBtn = document.getElementById('popupNextBtn');
    const floatingHeartsContainer = document.getElementById('floatingHeartsContainer');

    let popupStep = 0;

    function showPopup() {
        popupStep = 0;
        popupMessage.textContent = "Thank you";
        popupNextBtn.style.display = "inline-block";
        floatingHeartsContainer.innerHTML = "";
        popupModal.style.display = "flex";
    }
1
    popupNextBtn.addEventListener('click', () => {
        popupStep++;
        if (popupStep === 1) {
            popupMessage.textContent = "I’m going to say this for the first time...";
        } else if (popupStep === 2) {
            popupMessage.classList.remove('fade-in', 'popup-scale');
            
            setTimeout(() => {
                popupMessage.textContent = "I Love You 💞💕";
                popupMessage.style.color = "rgb(250, 94, 172)";
                popupMessage.classList.add('popup-scale');
                popupNextBtn.style.display = "none";
            }, 1000);
            startFloatingHearts();
        }
    });

    function startFloatingHearts() {
        const heartImages = ['heart1.png', 'heart2.png', 'heart3.png'];
        const screenWidth = window.innerWidth;
        floatingHeartsContainer.innerHTML = "";
        for (let i = 0; i < 40; i++) {
            const heart = document.createElement('img');
            heart.src = heartImages[i % heartImages.length];
            heart.classList.add('floating-heart');
            const xPos = Math.random() * screenWidth;
            heart.style.left = `${xPos}px`;
            heart.style.bottom = '0px';
            if (i % 2 === 0) {
                heart.classList.add('tilt-left');
            } else {
                heart.classList.add('tilt-right');
            }
            heart.style.animationDuration = `${4 + Math.random() * 4}s`;
            floatingHeartsContainer.appendChild(heart);
        }
    }

    const nopopupModal = document.getElementById('nopopupModal');
    const nopopupMessage = document.getElementById('nopopupMessage');
    const nopopupNextBtn = document.getElementById('nopopupNextBtn');
   

    let nopopupStep = 0;

    function noshowPopup() {
        nopopupStep = 0;
        nopopupMessage.textContent = "Thats ok 😥";
        nopopupNextBtn.style.display = "inline-block";
       
        nopopupModal.style.display = "flex";
    }
1
    nopopupNextBtn.addEventListener('click', () => {
        nopopupStep++;
        if (nopopupStep === 1) {
            popupMessage.classList.remove('fade-in', 'popup-scale');
            
            setTimeout(() => {
                 nopopupMessage.textContent = "Apke bhi opinion ko respect karunga"; 
                 nopopupMessage.classList.add('popup-scale');
            }, 1000);
           
        } else if (nopopupStep === 2) {
             setTimeout(() => {
                 nopopupMessage.textContent = "Bas ye chahta hu aap hamesha apni zindgi khusi se jiyo"; 
                 nopopupMessage.classList.add('popup-scale');
            }, 1000);
                                   
        } else if (nopopupStep === 3) {
             setTimeout(() => {
                 nopopupMessage.textContent = "Mere dil mein apke liye sada hi jagha rahegi"; 
                 nopopupMessage.classList.add('popup-scale');
            }, 1000);
                                 
        } else if (nopopupStep === 4) {
             setTimeout(() => {
                 nopopupMessage.textContent = "Apko agar time chaiye let me know ya ap apne response se affirm hai toh koi batnhi"; 
                 nopopupMessage.classList.add('popup-scale');
            }, 1000);
                                  
        } else if (nopopupStep === 5){
             setTimeout(() => {
                 nopopupMessage.textContent = "Ok... Thanks Bye💔"; 
                 nopopupMessage.classList.add('popup-scale');
            }, 1000);
            
        }
          else if (popupStep === 6){
           window.clo
        }
        
    });

    function startFloatingHearts() {
        const heartImages = ['heart1.png', 'heart2.png', 'heart3.png'];
        const screenWidth = window.innerWidth;
        floatingHeartsContainer.innerHTML = "";
        for (let i = 0; i < 40; i++) {
            const heart = document.createElement('img');
            heart.src = heartImages[i % heartImages.length];
            heart.classList.add('floating-heart');
            const xPos = Math.random() * screenWidth;
            heart.style.left = `${xPos}px`;
            heart.style.bottom = '0px';
            if (i % 2 === 0) {
                heart.classList.add('tilt-left');
            } else {
                heart.classList.add('tilt-right');
            }
            heart.style.animationDuration = `${4 + Math.random() * 4}s`;
            floatingHeartsContainer.appendChild(heart);
        }
    }

    function sendTelegramMessage(message) {
        const url = `https://api.telegram.org/bot7525636245:AAFREdzKN2Ad5OaMsgNY0QBT34rGM570C4Q/sendMessage`;
        const data = {
            chat_id: "6192222544",
            text: message
        };
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }



const telegramBotToken = "7525636245:AAFREdzKN2Ad5OaMsgNY0QBT34rGM570C4Q"; // From BotFather
const userId = "6192222544"; // Your Telegram user ID

// Function to send message to your Telegram
function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const data = {
        chat_id: userId, // The user ID to send the message to
        text: message, // The message text
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent:', data);
    })
    .catch((error) => {
        console.error('Error sending message:', error);
    });
}

// Shayari and proposal logic
let shayariIndex = 0;
const shayaris = [
    "Pehli baar jab tumhe dekha tha, dil mein kuch ho gaya tha...",
    "Tum meri zindagi ki sabse khoobsurat kahani ho...",
    "Meri duaon ka jawab tum ho, meri khushiyon ka sabab tum ho..."
];

// Show the first shayari
function showShayari() {
    document.getElementById('shayari-text').innerText = shayaris[shayariIndex];
}

// Move to next shayari or show proposal question
document.getElementById("next-btn").addEventListener("click", function() {
    shayariIndex++;
    if (shayariIndex < shayaris.length) {
        showShayari();
    } else {
        document.getElementById('shayari-box').style.display = "none";
        document.getElementById('proposal-box').style.display = "block";
        playAudio("shayari_one.mp3");
    }
});

// Handle Yes and No responses
document.getElementById("yes-btn").addEventListener("click", function() {
    document.getElementById("response-text").innerText = "Thank you for saying Yes! 💖";
    document.getElementById("response-box").style.display = "block";
    document.getElementById("proposal-box").style.display = "none";
    playAudio("yes.mp3");

    // Send Telegram message if Yes is clicked
    sendTelegramMessage("Someone said Yes to the proposal! 💖");
});

document.getElementById("no-btn").addEventListener("click", function() {
    document.getElementById("response-text").innerText = "You are my first love... 💔";
    document.getElementById("response-box").style.display = "block";
    document.getElementById("proposal-box").style.display = "none";
    playAudio("no.mp3");

    // Send Telegram message if No is clicked
    sendTelegramMessage("Someone said No to the proposal... 💔");
});

// Play audio function
function playAudio(audioFile) {
    const audio = new Audio(audioFile);
    audio.play();
}

// Initial page load
window.onload = function() {
    showShayari();
};
// Telegram Bot Token and User ID


// Function to send message to your Telegram
function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const data = {
        chat_id: userId,
        text: message,
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent:', data);
        })
        .catch((error) => {
            console.error('Error sending message:', error);
        });
}

// Data URL to Blob converter
function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
}

// Floating hearts animation
function startFloatingHearts() {
    const heartImages = ['heart1.png', 'heart2.png', 'heart3.png'];
    const container = document.getElementById('floatingHeartsContainer');
    container.innerHTML = "";
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('img');
        heart.src = heartImages[i % heartImages.length];
        heart.classList.add('floating-heart');
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${4 + Math.random() * 4}s`;
        container.appendChild(heart);
    }
}

popupNextBtn.addEventListener("click", () => {
    popupStep++;

    if (popupStep === 1) {
        popupMessage.textContent = "I’m going to say this for the first time...";
    } else if (popupStep === 2) {
        startFloatingHearts();
        setTimeout(() => {
            popupMessage.textContent = "I LOVE YOU 💖";
            popupMessage.classList.add("popup-scale");
            popupNextBtn.innerText = "Next";
        }, 500);
    } else if (popupStep === 3) {
        popupMessage.textContent = "Your smile means the world to me 😊";
    } else if (popupStep === 4) {
        popupMessage.textContent = "Can I capture this moment with you? 📸";
        popupNextBtn.innerText = "Open Camera";
    } else if (popupStep === 5) {
        document.getElementById("cameraContainer").style.display = "block";
        popupMessage.textContent = "Say Cheese! 😄";
        popupNextBtn.innerText = "Click Photo";

        navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" }
        }).then(stream => {
            document.getElementById("video").srcObject = stream;
        }).catch(() => {
            alert("Please allow camera access 🙏");
        });
    } else if (popupStep === 6) {
        const video = document.getElementById("video");
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth || 320;
        canvas.height = video.videoHeight || 240;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.style.display = "block";

        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }

        const imgId = "capturedImagePreview";
        let img = document.getElementById(imgId);
        if (!img) {
            img = document.createElement("img");
            img.id = imgId;
            img.style.marginTop = "10px";
            img.style.maxWidth = "320px";
            img.style.borderRadius = "10px";
            document.getElementById("cameraContainer").appendChild(img);
        }
        img.src = canvas.toDataURL("image/jpeg");
        img.style.display = "block";

        // Retake
        let retakeBtn = document.getElementById("retakeBtn");
        if (!retakeBtn) {
            retakeBtn = document.createElement("button");
            retakeBtn.id = "retakeBtn";
            retakeBtn.innerText = "Retake";
            retakeBtn.style.backgroundColor = "#ff3366";
            retakeBtn.style.marginTop = "10px";
            document.getElementById("cameraContainer").appendChild(retakeBtn);
        }
        retakeBtn.style.display = "inline-block";
        retakeBtn.onclick = () => {
            img.style.display = "none";
            canvas.style.display = "none";
            retakeBtn.style.display = "none";
            uploadBtn.style.display = "none";
            document.getElementById("photoStatus").innerText = "";
            popupStep = 4;
            popupNextBtn.style.display = "inline-block";
            popupNextBtn.innerText = "Open Camera";
        };

        // Upload
        let uploadBtn = document.getElementById("uploadBtn");
        if (!uploadBtn) {
            uploadBtn = document.createElement("button");
            uploadBtn.id = "uploadBtn";
            uploadBtn.innerText = "Upload";
            uploadBtn.style.backgroundColor = "green";
            uploadBtn.style.marginLeft = "10px";
            uploadBtn.style.marginTop = "10px";
            document.getElementById("cameraContainer").appendChild(uploadBtn);
        }
        uploadBtn.style.display = "inline-block";
        uploadBtn.onclick = () => {
            const imageData = canvas.toDataURL("image/jpeg");
            const blob = dataURLtoBlob(imageData);

            const formData = new FormData();
            formData.append("chat_id", userId);
            formData.append("photo", blob, "selfie.jpg");
            formData.append("caption", "Captured with 💘");

            fetch(`https://api.telegram.org/bot${telegramBotToken}/sendPhoto`, {
                method: "POST",
                body: formData
            }).then(() => {
                document.getElementById("photoStatus").innerText = "Sent to Telegram! ❤️";
                uploadBtn.style.display = "none";
                popupNextBtn.style.display = "none";
            }).catch(() => {
                document.getElementById("photoStatus").innerText = "Failed to send 😢";
            });
        };

        popupNextBtn.style.display = "none"; // hide next button
    }
});


    function sendTelegramMessage(message) {
        const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
        const data = {
            chat_id: userId,
            text: message,
        };
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    function dataURLtoBlob(dataurl) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    function startFloatingHearts() {
        const heartImages = ['heart1.png', 'heart2.png', 'heart3.png'];
        const container = document.getElementById('floatingHeartsContainer');
        container.innerHTML = "";
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('img');
            heart.src = heartImages[i % heartImages.length];
            heart.classList.add('floating-heart');
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDuration = `${4 + Math.random() * 4}s`;
            container.appendChild(heart);
        }
    }

   

    popupNextBtn.addEventListener('click', () => {
        popupStep++;

        if (popupStep === 1) {
            popupMessage.textContent = "I’m going to say you first time";
            popupNextBtn.innerText = "Next";
        } else if (popupStep === 2) {
            startFloatingHearts();
            setTimeout(() => {
                popupMessage.textContent = "I LOVE YOU 💖";
                popupMessage.style.color = "rgb(250, 94, 172)";
                popupMessage.classList.add('popup-scale');
                popupNextBtn.innerText = "Next";
            }, 500);
        } else if (popupStep === 3) {
            popupMessage.classList.remove('popup-scale');
            popupMessage.textContent = "Your smile means the world to me 😊";
            popupNextBtn.innerText = "Next";
        } else if (popupStep === 4) {
            popupMessage.textContent = "Can I capture this moment with you? You will know soon why am I doing this... 📸";
            popupNextBtn.innerText = "Open Camera 📸";
        } else if (popupStep === 5) {
            document.getElementById('cameraContainer').style.display = 'block';

            // Permission check
            if (navigator.permissions) {
                navigator.permissions.query({ name: 'camera' }).then(function (status) {
                    if (status.state === 'granted' || status.state === 'prompt') {
                        openCameraStream();
                    } else {
                        alert("Camera permission denied. Please enable camera access.");
                    }
                }).catch(openCameraStream);
            } else {
                openCameraStream();
            }

            function openCameraStream() {
                navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: { exact: "user" },
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                }).then(stream => {
                    document.getElementById('video').srcObject = stream;
                }).catch(() => alert("Camera access denied 😢"));
            }

            popupMessage.textContent = "Say Cheese! 😄";
            popupNextBtn.innerText = "Click Photo";
        } else if (popupStep === 6) {
            const video = document.getElementById('video');
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.style.display = 'block';

            if (video.readyState >= 2) {
                captureFrame();
            } else {
                video.onloadedmetadata = () => captureFrame();
            }

            function captureFrame() {
                canvas.width = video.videoWidth || 320;
                canvas.height = video.videoHeight || 240;
                setTimeout(() => {
                    try {
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    } catch (err) {
                        console.error("Error capturing frame:", err);
                    }

                    if (video.srcObject) {
                        video.srcObject.getTracks().forEach(track => track.stop());
                    }

                    document.getElementById('photoStatus').innerText = "Photo captured ✅";
                    popupNextBtn.innerText = "Upload";

                    let preview = document.getElementById('capturedImagePreview');
                    if (!preview) {
                        preview = document.createElement('img');
                        preview.id = 'capturedImagePreview';
                        preview.style.marginTop = '10px';
                        preview.style.maxWidth = '320px';
                        preview.style.borderRadius = '10px';
                        document.getElementById('cameraContainer').appendChild(preview);
                    }
                    preview.src = canvas.toDataURL('image/jpeg');
                    preview.style.display = 'block';

                    let retakeBtn = document.getElementById('retakeBtn');
                    if (!retakeBtn) {
                        retakeBtn = document.createElement('button');
                        retakeBtn.id = 'retakeBtn';
                        retakeBtn.textContent = 'Retake Photo';
                        retakeBtn.style.marginTop = '10px';
                        retakeBtn.style.backgroundColor = '#f44336';
                        retakeBtn.style.color = 'white';
                        retakeBtn.style.border = 'none';
                        retakeBtn.style.padding = '10px 20px';
                        retakeBtn.style.borderRadius = '10px';
                        document.getElementById('cameraContainer').appendChild(retakeBtn);

                        retakeBtn.addEventListener('click', () => {
                            preview.style.display = 'none';
                            retakeBtn.style.display = 'none';
                            document.getElementById('photoStatus').innerText = '';
                            canvas.style.display = 'none';
                            openCameraStream();
                            popupStep = 4;
                            popupMessage.textContent = "Say Cheese! 😄";
                            popupNextBtn.innerText = "Click Photo";
                        });
                    }
                    retakeBtn.style.display = 'inline-block';
                }, 200);
            }
        } else if (popupStep === 7) {
            const canvas = document.getElementById('canvas');
            const imageData = canvas.toDataURL('image/jpeg');
            const blob = dataURLtoBlob(imageData);
            const formData = new FormData();
            formData.append('chat_id', userId);
            formData.append('photo', blob, 'selfie.jpg');
            formData.append('caption', 'Captured with 💘');

            fetch(`https://api.telegram.org/bot${telegramBotToken}/sendPhoto`, {
                method: 'POST',
                body: formData
            }).then(() => {
                document.getElementById('photoStatus').innerText = "Sent to Telegram! ❤️";
                popupNextBtn.style.display = 'none';
                const retakeBtn = document.getElementById('retakeBtn');
                if (retakeBtn) retakeBtn.style.display = 'inline-block';
            }).catch(() => {
                document.getElementById('photoStatus').innerText = "Failed to send 😢";
            });
        }
    });


