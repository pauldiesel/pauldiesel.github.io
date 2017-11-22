---
redirect: true
title: "Arcane Reveries"
subtitle: "My timely musings"
excerpt: "Hello everybody. This is about Manikanta, an Amateur Astronomer staring at the dark skies and a Software Developer working at Microsoft creating an impact. I heard that you wanted to know me, so here you go."
feature: "/assets/img/blog.jpg"
sitemap:
    priority: 1
    changefreq: 'weekly'
---
<html>

<head>
    {% include head.html %}
    {% if page.redirect %}
        <meta http-equiv="refresh" content="0; url={{site.url}}/blog" />
        <link rel="canonical" href="{{site.url}}/blog" />
    {% endif %}
</head>
</html>