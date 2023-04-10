<template>
  <div class="main">
    <div class="content">
      <div class="boxcenter">
        <div class="rowrow">

          <div
            class="boxleft marginright"
            v-for="(item, index) in listLeftContent"
            :key="index"
          >
            <div class="row boxnews1 boderbt">
              <img
                :src="require(`../assets/common/images/${item.image}`)"
                alt=""
              />
              <a href="#">{{ item.title }}</a>
            </div>
          </div>


        </div>
        <div
            class="boxcenter1 marginright"
            v-for="(item, index) in listMidContent"
            :key="index"
          >
            <div class="row boxnews2">
              <img src="../assets/common/images/cau.jpg" alt="" />
              <a href="#">{{ item.title }}</a>
              <p href="#">{{ item.title_detail }}</p>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tutorial",
  components: {},
  data() {
    return {
      listLeftContent: [
        {
          image: "pic1.png",
          title: "Mancity",
          id: 0,
        },
        {
          image: "cong_an.jpg",
          title: "ManU",
          id: 1,
        },
        {
          image: "tiet_canh.jpg",
          title: "Arsenal",
          id: 2,
        },
        {
          image: "trump.jpg",
          title: "LiverPool",
          id: 3,
        },
        {
          image: "non_la.jpg",
          title: "VN",
          id: 4,
        },
      ],
      listMidContent: [
        {
          image: "cau.jpg",
          title:
            "Cây cầu được mong chờ hết 'lỗi hẹn' ở cửa ngõ phía nam TP.HCM",
          title_detail:
            "Được phê duyệt hơn 20 năm, cầu Long Kiểng mất 3 năm tạm ngừng vì vướng mặt bằng xây dựng. Cây cầu được tái khởi động và đạt hơn 65% khối lượng xây lắp.",
          id: 5,
        },
      ],
    };
  },

  methods: {
    handleChangeRoute() {
      this.$router.push("");
    },
  },
  mounted() {
    console.log(this.listLeftContent, "listLeftContent");
  },
};
</script>
<style lang="css" scoped>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11pt;
}
.main {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.flex {
  display: flex;
  justify-content: flex-start;
}
.rowrow {
  display: flex;
  justify-content: space-between;
  flex-direction: column; 
}

.content {
  min-height: 650px;
}
.boxcenter {
  width: 60%;
  margin: 0 auto;
}
.margintop {
  margin: 10px 0;
}
.marginright {
  margin-right: 2%;
}
.boxleft {
  width: 25%;
}
.boxright {
  width: 25%;
}
.boxcenter1 {
  width: 70%;
}
.bg {
  background-color: aqua;
}
.minh {
  min-height: 520px;
}
.boxnews1 {
  padding-bottom: 15px;
  margin-bottom: 15px;
}
.boxnews1 img {
  width: 45%;
  margin-right: 10px;
}
.boxnews1 a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}
.boxnews1 a:hover {
  color: #369;
}
.boderbt {
  border-bottom: 1px #ccc solid;
}
.boxnews2 img {
  width: 100%;
}
.boxnews2 a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  font-size: 18pt;
}
.boxnews2 a:hover {
  color: #369;
}
.boxnews3 {
  padding-bottom: 15px;
  margin-bottom: 15px;
}
.boxnews3 img {
  width: 100%;
}
.boxnews3 a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}
.boxnews3 a:hover {
  color: #369;
}
.bgboxbox {
  width: 96%;
  padding: 2%;
  background-color: yellow;
  min-height: 500px;
}
.boxbox {
  margin: 0 auto;
  width: 64%;
}
.box1 {
  display: flex;
  justify-content: space-between;
}
.box2 {
  display: flex;
  justify-content: space-between;
}
.marginbt {
  margin-bottom: 30px;
}
.pic1 {
  width: 48%;
}
.pic1 img {
  width: 100%;
}
.pic2 {
  width: 23%;
}
.pic2 img {
  width: 100%;
}
.mgbt {
  margin-bottom: 20px;
}
.news1 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 70%;
  margin-top: 4px;
}
.news1 a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  font-size: 18pt;
}
.news2 {
  width: 26%;
}
</style>
