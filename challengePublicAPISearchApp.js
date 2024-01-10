// ให้สร้างเว็บไซต์ Public API search โดยใช้ api ตาม document นี้ (document link)
// api ที่ให้ไว้เป็น api ที่ให้ข้อมูลเกี่ยวกับ public api ในโลกนี่ ซึ่งมี feature ต่างๆ มากมาย อยากให้เข้าไปอ่านทำความเข้าใจใน document (document link) ก่อนเริ่มทำ challenge

// Public API search web ควรมี feature ดังนี้

// มีระบบการ search โดย search ตาม api title
// มีระบบการ search โดย search ตาม ประเภทของ api โดย UI การ search จะเป็น Text field หรือ เป็น dropdown ก็ได้ (เเนะนำให้เป็น dropdown  เพื่อ ux ที่ดี)
// นำ api detail ที่ดึงมาได้เเสดงผลให้สวยงาม เเละเข้าใจง่าย (สามารถใช้ css framework เพื่อช่วยเรื่องความสวยงามได้)
// feature อื่นๆ สามารถเพิ่มเติมได้เต็มที่
// สามารถ design รูปเเบบของเว็บนี้ได้อย่างเต็มที่ตามความคิดสร้างสรรค์

// pseudo code / get value by input element
// step 1 : ดึงข้อมูลจาก input ช่อง search มาก่อน
const formElement = document.querySelector("#searchForm");

formElement.addEventListener("submit", function (e) {
  //ป้องกันการ refresh หน้าจอ
  e.preventDefault();
  const searchName = document.getElementById("nameOfCharacter").value;
  console.log(searchName);
  clearDetail();
  getDetailApis(searchName);
});
// step 2 : สร้าง element detail ของ anime ที่ค้นหา
// https://nekos.best/api/:version

const getDetailApis = async (searchName) => {
  try {
    const res = await axios.get(
      `https://nekos.best/api/v2/${searchName}?amount=20`
    );
    console.log(res.data);
    showDetail(res.data);
  } catch (error) {
    console.error(`No image reference with your searching`, error);
  }
};

// step 3 : เอาคำค้นหาที่ได้จาก step 1 ส่งไปค้นหาที่ api
const showDetail = (data) => {
  //clear previous details
  const animeDetails = document.querySelector("#animeDetails");
  animeDetails.innerHTML = "";

  // มาจาก data.results[0].artist_name
  data.results.forEach((item) => {
    const detailAnimes = document.createElement("div");

    // fetch data the artist_name
    const artistName = document.createElement("a");
    artistName.href = item.artist_href;
    artistName.target = "_blank"; // Open link in a new tab
    artistName.textContent = item.artist_name;
    // fetch data the anime_name

    const animeName = document.createElement("p");
    animeName.textContent = item.anime_name;

    // Image
    const imageUrl = document.createElement("img");
    imageUrl.src = item.url;
    imageUrl.style.width = "200px";

    // Appen everything to the detailAnime div
    detailAnimes.append(artistName, animeName, imageUrl);

    animeDetails.appendChild(detailAnimes);
  });

  //   const detailAnimes = document.createElement("div");
  //   const artistName = document.querySelector("#artistName");
  //   const imageUrl = document.createElement("img");
  //   imageUrl.src = data.result.url;
  //   imageUrl.style.width = "500px";
  //   artistName.innerHTML = item.artist_name;
  //   detailAnimes.append(artistName, imageUrl);
  //   animeDetails.appendChild(detailAnimes);
};

const clearDetail = () => {
  const imageExisting = document.querySelectorAll("img");
  for (const image of imageExisting) {
    image.remove();
  }
};
