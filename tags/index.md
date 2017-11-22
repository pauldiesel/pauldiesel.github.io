---
PageTitle: Tags | Manikanta Reddy
layout: index
title: Tags
comments: false
excerpt: "Hello everybody. This is about Manikanta, an Amateur Astronomer staring at the dark skies and a Software Developer working at Microsoft creating an impact. I heard that you wanted to know me, so here you go."
feature: "/assets/img/tags.png"
sitemap:
    priority: 0.8
    changefreq: 'weekly'
---
<div id="loadspinner">
    {% include spinner.html %}
</div>
<div id="tags" style="display: none;">
<canvas id="cloud-canvas" style="width: 100%; ">
</canvas>
<h2>Search</h2>
<div id="tagSearch" style="font-family: 'Comfortaa'; font-size: 18px; line-height: 150%;" >
  <input class="form-control" type="text" v-model="search" placeholder="Type Something...">
  <table class="table table-hover" >
    <tr v-for="data in result" >
        <td><a :href="'{{ site.url }}/tags/'+data.tag">(% data.tag %)</a></td>
        <td>(%data.size %)</td>
    </tr>
  </table>
</div>
</div>
