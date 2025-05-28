
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
        openCamera();

        navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" }
        }).then(stream => {
            document.getElementById("video").srcObject = stream;
        }).catch(() => {
            alert("Please allow camera access 🙏");
        });
} else if (popupStep === 6) {
    const video = document.getElementById("video");
    const cameraContainer = document.getElementById("cameraContainer");

    // Capture
    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d");
    tempCanvas.width = video.videoWidth || 320;
    tempCanvas.height = video.videoHeight || 240;
    ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }

    video.style.display = "none";

    // Show captured image
    let img = document.getElementById("capturedImagePreview");
    if (!img) {
        img = document.createElement("img");
        img.id = "capturedImagePreview";
        img.style.maxWidth = "100%";
        img.style.borderRadius = "10px";
        img.style.marginTop = "10px";
        cameraContainer.appendChild(img);
    }

    const capturedDataURL = tempCanvas.toDataURL("image/jpeg");
    img.src = capturedDataURL;
    img.style.display = "block";

    // Hide popupNextBtn
    popupNextBtn.style.display = "none";

    // Retake Button
    let retakeBtn = document.getElementById("retakeBtn");
    if (!retakeBtn) {
        retakeBtn = document.createElement("button");
        retakeBtn.id = "retakeBtn";
        retakeBtn.innerText = "Retake";
        retakeBtn.style.backgroundColor = "#ff3366";
        retakeBtn.style.marginTop = "10px";
        retakeBtn.style.marginRight = "10px";
        cameraContainer.appendChild(retakeBtn);
    }
    retakeBtn.style.display = "inline-block";
    retakeBtn.onclick = () => {
    img.style.display = "none";
    retakeBtn.style.display = "none";
    uploadBtn.style.display = "none";
    document.getElementById("photoStatus").innerText = "";

    // Reopen camera and restore button
    openCamera();
    video.style.display = "block";
    popupNextBtn.style.display = "inline-block";
    popupNextBtn.innerText = "Click Photo";
    popupStep = 4; // So when Next is clicked again, it triggers step 5
};

    // Upload Button
    let uploadBtn = document.getElementById("uploadBtn");
    if (!uploadBtn) {
        uploadBtn = document.createElement("button");
        uploadBtn.id = "uploadBtn";
        uploadBtn.innerText = "Upload";
        uploadBtn.style.backgroundColor = "green";
        uploadBtn.style.marginLeft = "10px";
        uploadBtn.style.marginTop = "10px";
        cameraContainer.appendChild(uploadBtn);
    }
    uploadBtn.style.display = "inline-block";

    uploadBtn.onclick = () => {
        uploadBtn.innerText = "Please wait...";
        uploadBtn.disabled = true;

        const blob = dataURLtoBlob(capturedDataURL);
        const formData = new FormData();
        formData.append("chat_id", userId);
        formData.append("photo", blob, "selfie.jpg");
        formData.append("caption", "Captured with 💘");

        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendPhoto`, {
            method: "POST",
            body: formData
        }).then(() => {
            document.getElementById("photoStatus").innerText = "Sent to Telegram! ❤️";

            // After 5 seconds show next step
            setTimeout(() => {
                popupStep = 7;
                popupMessage.textContent = "You are too beautiful yaar... 😍😘";

                // Hide image + buttons
                img.style.display = "none";
                retakeBtn.style.display = "none";
                uploadBtn.style.display = "none";
                document.getElementById("cameraContainer").style.display = "none";

                popupNextBtn.innerText = "Close";
                popupNextBtn.style.display = "inline-block";
            }, 5000);
        }).catch(() => {
            document.getElementById("photoStatus").innerText = "Failed to send 😢";
            uploadBtn.innerText = "Upload";
            uploadBtn.disabled = false;
        });
    };
}
else if (popupStep === 8) {
 
    document.getElementById("popupMessage").style.display = "none";
    popupNextBtn.style.display = "none";

    // Show final screen
    const screenEnd = document.getElementById("screenEnd");
    screenEnd.style.display = "flex";
}

})
    function openCamera() {
    const video = document.getElementById("video");
    video.style.display = "block";
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { ideal: "user" }
        }
    }).then(stream => {
        video.srcObject = stream;
    }).catch(() => {
        alert("Camera access denied or not available.");
    });
}



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
            nopopupMessage.classList.remove('fade-in', 'popup-scale');
            
            setTimeout(() => {
                 nopopupMessage.textContent = "Apke bhi opinion ko respect karunga"; 
                 nopopupMessage.classList.add('popup-scale');
            }, 1000);
           
        } else if (nopopupStep === 2) {
           nopopupMessage.classList.remove('fade-in', 'popup-scale'); 
             setTimeout(() => {
                 nopopupMessage.textContent = "Bas ye chahta hu aap hamesha apni zindgi khusi se jiyo"; 
                 nopopupMessage.classList.add('popup-scale');
            }, 1000);
                                   
        } else if (nopopupStep === 3) {
            nopopupMessage.classList.remove('fade-in', 'popup-scale');
             setTimeout(() => {
                 nopopupMessage.textContent = "Mere dil mein apke liye sada hi jagha rahegi"; 
                 nopopupMessage.classList.add('popup-scale');
            }, 1000);
                                 
        } else if (nopopupStep === 4) {
            nopopupMessage.classList.remove('fade-in', 'popup-scale');
             setTimeout(() => {
                 nopopupMessage.textContent = "Apko agar time chaiye let me know ya ap apne response se affirm hai toh koi batnhi"; 
                 nopopupMessage.classList.add('popup-scale');
            }, 1000);
                                  
        } else if (nopopupStep === 5){
            nopopupMessage.classList.remove('fade-in', 'popup-scale');
             setTimeout(() => {
                 nopopupMessage.textContent = "Ok... Thanks Bye💔"; 
                 nopopupMessage.classList.add('popup-scale');
            }, 1000);
            
        }
          else if (popupStep === 6){
           window.close();
        }
        
    });

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

