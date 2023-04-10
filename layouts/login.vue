<template>
  <div>
    <div class="top">
      <div class="boxcenter">
        <ul>
          <li>
            <a><img src="../assets/common/images/logo.png" alt="" /></a>
            <a href="#">Xuất bản</a>
            <a href="#">Kinh doanh</a>
            <a href="#">Công nghê</a>
            <a href="#">Thể thao</a>
            <a href="#">Giải trí</a>
            <a href="#">Đời sống</a>
            <a href="#">Lifestyle</a>
          </li>
        </ul>
      </div>
    </div>
    <nuxt-child />
    <div class="footer">
      <div class="container">
        <div class="noi-dung about">
          <h2>ZingNews</h2>
          <p>Tạp chí điện tử Tri thức trực tuyến</p>
          <p>Cơ quan chủ quản: Hội Xuất bản Việt Nam</p>
          <p>
            Giấy phép báo chí: số 75/GP-BTTTT do Bộ Thông tin và Truyền thông
            cấp ngày 26/02/2020
          </p>
          <p>Phó tổng biên tập phụ trách: Lâm Quang Hiếu</p>
          <p>© Toàn bộ bản quyền thuộc Tri thức trực tuyến</p>
        </div>
        <div class="noi-dung contact">
          <ul class="info">
              <p>Tòa soạn: Tầng 7, D29 Phạm Văn Bạch, Quận Cầu Giấy, Hà Nội</p>
              <p>0931.222.666</p>
              <p>diachiemail@gmail.com</p>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginLayout",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="css" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: white;
}
li {
  float: left;
}
li a {
  display: flexbox;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover {
  color: white;
  background-color: white;
  font-weight: bold;
}
.active {
  background-color: #58257b;
  color: white;
}
.top {
  min-height: 30px;
  border-bottom: 1px #ccc solid;
  padding: 10px 0px;
}
.boxcenter {
  width: 60%;
  margin: 0 auto;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 0px;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  width: 1100px !important;
  margin-left: 400px;
}
.footer {
  clear: both;
  float: left;
  width: 100%;
  margin: 0 auto 0;
  padding: 0;
  position: relative;
  overflow: hidden;
  font-size: 12px;
  background: #f7f7f7;
}
</style>
