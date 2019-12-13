<template>
  <div class="home">
    <div class="wrap">
      <!-- 播放器主体 -->
      <div class="play_wrap" id="player">
        <!-- 顶部 -->
        <div class="search_bar">
          <img src="@/assets/images/player_title.png" alt />
          <!-- 搜索歌曲 -->
          <input type="text" autocomplete="off" v-model="query" @keyup.enter="searchMusic" />
        </div>
        <!-- 主体 -->
        <div class="center_con">
          <!-- 搜索歌曲列表-->
          <div class="song_wrapper">
            <ul class="song_list">
              <li v-for="(music,index) in musicList" :key="index">
                <a href="javascript:;" @click="playMusic(music.id)"></a>
                <b>{{music.name}} -- {{music.artists[0].name}}</b>
                <span v-show="music.mvid != 0" @click="playMv(music.mvid)">
                  <i></i>
                </span>
              </li>
            </ul>
            <img src="@/assets/images/line.png" class="switch_btn" alt />
          </div>
          <!-- 歌曲主体容器-->
          <div class="player_con" :class="{'playing': isPlay } ">
            <img src="@/assets/images/player_bar.png" alt class="play_bar" />
            <!-- 黑蝶胶片 -->
            <img src="@/assets/images/disc.png" alt class="disc autoRotate" />
            <img :src="mysicPic" alt class="cover autoRotate" />
          </div>
          <!-- 热门评论 -->
          <div class="comment_wrapper">
            <h5 class="title">热门留言</h5>
            <div class="comment_list">
              <dl v-for="(comment, index) in hotComments" :key="index">
                <dt>
                  <img :src="comment.user.avatarUrl" alt />
                </dt>
                <dd class="name">{{ comment.user.nickname }}</dd>
                <dd class="detail">{{ comment.content }}</dd>
              </dl>
            </div>
            <img src="@/assets/images/line.png" alt class="right_line" />
          </div>
        </div>
        <!-- 播放栏-->
        <div class="audio_con">
          <audio
            :src="musicUrl"
            controls="controls"
            @play="isPlay = true"
            @pause="isPlay = false"
            autoplay="autoplay"
            loop="loop"
            class="myaudio"
          ></audio>
        </div>
        <!-- 视频遮罩-->
        <div class="video_con" v-if="mvPlay">
          <video :src="mvUrl" controls="controls" autoplay="autoplay"></video>
          <div class="mask" @click="mvPlay = false"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      //搜索音乐关键词
      query: "",
      //搜索的音乐列表
      musicList: [],
      //音乐链接
      musicUrl: "",
      //音乐封面
      mysicPic: "",
      //热门评论列表
      hotComments: [],
      //音乐播放状态
      isPlay: false,
      //视频链接
      mvUrl: "",
      //mv播放状态
      mvPlay: false
    };
  },
  components: {
    HelloWorld
  },
  methods: {
    //搜索歌曲
    searchMusic: function() {
      var that = this;
      axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
        function(response) {
          //console.log(response);
          that.musicList = response.data.result.songs;
        },
        function(err) {
          console.log(err);
        }
      );
    },
    //点击按钮后播放歌曲
    playMusic: function(id) {
      var that = this;
      //获取歌曲mp3
      axios.get("https://autumnfish.cn/song/url?id=" + id).then(
        function(response) {
          //console.log(response);
          that.musicUrl = response.data.data[0].url;
        },
        function(err) {}
      );
      //获取歌曲封面
      axios.get("https://autumnfish.cn/song/detail?ids=" + id).then(
        function(response) {
          that.mysicPic = response.data.songs[0].al.picUrl;
        },
        function(err) {}
      );
      that.isPlay = true;
      //获取歌曲评论
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + id).then(
        function(response) {
          that.hotComments = response.data.hotComments;
        },
        function(err) {}
      );
    },
    //播放mv
    playMv: function(id) {
      var that = this;
      that.isPlay = false;
      console.log(id);
      axios.get("https://autumnfish.cn/mv/url?id=" + id).then(
        function(response) {
          console.log(response.data.data.url);
          that.mvUrl = response.data.data.url;
          that.mvPlay = true;
        },
        function(err) {}
      );
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/index.css");
</style>>
