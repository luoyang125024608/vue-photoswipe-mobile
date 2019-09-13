#vue-photoswipe-mobile

> 基于[photoswipe](http://photoswipe.com)的vue图片查看器

## 说明

1、只支持移动端，不支持pc，解决了很多手势问题，所以割舍了pc的支持。

2、支持slot扩展 topbar 和 底栏caption

3、取消了图片需设定尺寸的要求

4、解决了长按图片浏览器无法弹出保存动作的问题

5、解决了连续双击放大缩小图片导致放大过程终止的问题

6、强行关掉原photoswipe参数
````
captionEl =  false    // 不用原插件的底栏
fullscreenEl = false  // mobile不用全屏
shareEl = false       // 关掉了分享
arrowEl = false       // 关掉了左右箭头
zoomEl = false        // 关掉了放大镜按钮
````
7、存在slot的topbar时，强行关掉了以下参数

```
preloaderEl = false // 预加载的loading图
counterEl = false  //  current/图片数量，需要自己在topbar实现，看下面
closeEl = false // 关闭按钮，需要自己在topbar实现，看下面
```

# 安装
```
npm install vue-photoswipe-mobile --save
```
# 引入
```
import previewer from 'vue-photoswipe-mobile'
```
模块没打包成umd，需要的话自己拉代码去打包吧。都2020年了。

#使用

### 参数


###index 
需要显示的图片索引 必传

###list    
图片列表[{src:'xxx'},{src:'xxx'}] 必传

###options 
参照[photoswipe](http://photoswipe.com) 不必传
options.addCaptionHTMLFn 被去掉了，用slot去插入caption吧

###函数调用方式
```
previewer.open(index, list, options)

函数调用事用open
```
###组件调用方式

局部注册组件
```
components:{
  previewer
}
```
模板写法
使用slot扩展底栏和头部
```
list : [{src:'xxx',captionData:{}},{src:'xxx',captionData:{}}]
```
```
<previewer :list="list" ref="previewer" :options="{tapToClose:false}">
      <template slot-scope="{current}" slot="topbar">
        <div class="flex flex-align-center flex-justify-between">
          <span>{{current+1}} of {{list.length}}</span>
          <a @click="$refs.previewer.close()">关闭</a>
        </div>
      </template>
      <template slot-scope="{current}" slot="caption">
        <some-caption :captionData="list[current].captionData"></some-caption>
      </template>
    </previewer>

    this.$refs.previewer.show(index)
```


## 生产例子  
[地址](https://m.9ji.com/product/comment/38904?type=5) 



