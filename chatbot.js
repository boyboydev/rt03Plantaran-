const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const sendChat = document.getElementById("sendChat");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

chatToggle.onclick = () => {

    if(chatBox.style.display=="flex"){

        chatBox.style.display="none";

    }else{

        chatBox.style.display="flex";

    }

};

sendChat.onclick = kirimPesan;

chatInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        kirimPesan();

    }

});

function kirimPesan(){

    let text=chatInput.value.trim();

    if(text=="") return;

    chatBody.innerHTML+=`
    <div class="user-msg">
        ${text}
    </div>
    `;

    let balasan="Maaf, saya belum memahami pertanyaan tersebut.";

    const t=text.toLowerCase();

    if(t.includes("halo") || t.includes("hai") || t.includes("assalamualaikum")){

    balasan="Halo 👋 Selamat datang di Website RT 03 RW 01 Desa Bayu. Ada yang bisa saya bantu?";

}

else if(t.includes("ketua") || t.includes("rt") || t.includes("rw")){

    balasan="Silakan buka menu Kontak untuk melihat nomor Ketua RT, RW, Kepala Dusun, dan Kepala Desa.";

}

else if(t.includes("jadwal") || t.includes("sholat")){

    balasan="Silakan lihat menu Informasi Hari Ini untuk melihat jadwal sholat, cuaca, dan jam digital.";

}

else if(t.includes("pengumuman")){

    balasan="Silakan buka menu Pengumuman untuk melihat informasi terbaru dari RT.";

}

else if(t.includes("lokasi") || t.includes("maps")){

    balasan="Silakan buka menu Lokasi RT dan tekan tombol 'Buka Google Maps'.";

}

else if(
    t.includes("durian") ||
    t.includes("musim durian")
){

    balasan="🌳 Saat ini durian di Desa Bayu belum memasuki musim. 😊 Kalau sudah musim, kami akan mengabari melalui website ini. Jangan lupa cek pengumuman secara berkala ya!";

}

else if(
    t.includes("wisata") ||
    t.includes("kampung desa bayu") ||
    t.includes("edukasi")
){

    balasan="🌿 Saat ini sedang dibangun Wisata Edukasi Kampung Desa Bayu. Nantinya wisata ini akan menyajikan suasana pedesaan yang alami, udara yang sejuk, hamparan persawahan hijau, serta menjadi tempat edukasi dan rekreasi bagi masyarakat. Untuk saat ini pembangunan masih berlangsung, mohon doa dan dukungannya agar segera selesai.";

}

else if(
    t.includes("terima kasih") ||
    t.includes("makasih")
){

    balasan="Sama-sama 😊 Semoga informasi yang saya berikan bermanfaat.";

}

else if(
    t.includes("siapa kamu")
){

    balasan="Saya adalah Asisten Digital Website Desa Bayu yang siap membantu memberikan informasi kepada warga dan pengunjung.";

}

else if(
    t.includes("desa bayu")
){

    balasan="Desa Bayu merupakan desa di Kecamatan Songgon, Kabupaten Banyuwangi yang memiliki potensi alam, pertanian, perkebunan, serta sedang mengembangkan Wisata Edukasi Kampung Desa Bayu.";

}

    chatBody.innerHTML+=`
    <div class="bot-msg">
        ${balasan}
    </div>
    `;

    chatBody.scrollTop=chatBody.scrollHeight;

    chatInput.value="";

}