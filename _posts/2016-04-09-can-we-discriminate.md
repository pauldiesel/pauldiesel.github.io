---
layout: post
title: "A survey on Human Sex Determination methods"
date: 2016-04-09
project: true
excerpt: "Identifying the sex of an individual is a challenging problem in
    Computer Vision. In the recent years various methods have surfaced to
    solve this classification problem and get closer to achieve better human
    machine interaction. In this survey we study a number of such algorithms
    which classify human subjects into male and female classes. This task is
    done by looking at a number of features, like face, body and motion."
comments: true
mathjax: true
tags: ai machine-learning binary-classification image-processing sex feature-engineering
feature: "/assets/posts/2016-04-09-can-we-discriminate/feature.gif"
---

---

Introduction
============

We provide a survey of human sex recognition using computer vision
techniques. We review multiple methods the exploit information from face
and whole body. Identifying demographic attributes is a key point of
machine-human interaction. While humans can do this task very easily it
is a challenging task for computer vision.

In general, we breakdown the problem into multiple phases. Object
detection, preprocessing, feature extraction and classification. All
these sub problems depend on the choice of feature we wish to encode and
use. Once the object of interest is detected we then process it to
extract features and their corresponding descriptors. We then use these
descriptors to train a classifier. [^ng2012vision]

Face Based Methods
==================

While using faces as our objects, we realize that the face region could
also include features from hair and neck. A human also exhibits
variation which make it hard for us to encode them using raw pixel
values. The features also depend on race, age, expression and
accessories worn. [^viola2001rapid] [^viola2004robust]

Dimensionality Reduction using PCA
----------------------------------

To extract feature vector from our facial image, we used the technique
of dimensionality reduction using PCA[^jolliffe2002principal]. PCA is a
transformation scheme which transforms the data to a new coordinate
system. The axes in this new coordinate system are found by finding the
directions of maximum variance in our data. Direction of maximum
variance is found by calculating the Eigenvector of covariance matrix
corresponding to large Eigen values.

Around $95\%$ of total variance was explained by 80 dimensions.
Following Eigenfaces were obtained after dimensionality reduction of
image. We used these Eigenfaces[^turk1991face] as input to our classifier
for classification to male and female.

![]({{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/figure_1.png)

We tried Linear Support Vector classifier and Decision tree based
classification. Following results were obtained.

<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/2.png" />
    </div>
    <div class="col-md-6">
        <img src="{{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/3.png" />
    </div>
</div>

The classification accuracy seems to be pretty good around  98%. As expected, SVM classifier performs better than decision forests.

Data Set Used
-------------

<div class="row">
    <div class="col-md-6">
        Nottingham Dataset[^nottinghamdataset]
        <img src="{{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/21.png" />
    </div>
    <div class="col-md-6">
        Faces94[^faces94dataset]
        <img src="{{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/20.png" />
    </div>
</div>


Lowe Key Point Descriptors
--------------------------

We tried to encapsulate the key points of the image by using a Lowe
Descriptors in an orderly fashion. We divided the image into grids and
generate Lowe descriptors for the intersection points. Lowe
descriptor[^lowe2004distinctive] is essentially a histogram of gradient
map of the neighborhood of the descriptor.

![image]({{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/22.png)
We generated key point descriptors in a grid wise manner for every
person and performed a classification based on them.

We then flattened all the key point descriptors in an order, row by row
and used it as a descriptor for the image.

We then used multiple classifying algorithms to identify sex. Here are
the results of our experiment.

### Accuracies
<div width="50%">
<table>
<thead>
<tr>
<th>Classifier</th>
<th>Lowe Descriptor</th>
</tr>
</thead>
<tbody>
<tr>
<td>LinearSVC</td>
<td><span class="math inline">0.611 ± 0.002</span></td>
</tr>
<tr>
<td>Random Forest</td>
<td><span class="math inline">0.600 ± 0.002</span></td>
</tr>
<tr>
<td>Perceptron</td>
<td><span class="math inline">0.628 ± 0.090</span></td>
</tr>
<tr >
<td>Adaboost</td>
<td><span class="math inline">0.621 ± 0.005</span></td>
</tr>
</tbody>
</table>
</div>
We realize at this point that using Lowe descriptors wasn’t a very good
idea as the orderly way we encoded the vectors didn’t actually capture
the features (Spatial Description in the form of geometric features).\
This might be the reason for very low performance of this method.

Online Port
-----------

<img src="{{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/23.png"/>


Demonstration
-------------

We ported the algorithm based on facial features to work on the IIT
Kanpur Pedestrian Data set and the results were visually pleasing. 
The blue box around a person’s face indicates that his sex is male. As
we have haar cascades for frontal face, all the faces in the frame are
not detected and hence are not classified.

![image]({{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/41.png)

Caveats
-------

The current implementation is not very robust to uncontrolled
environmental conditions, as we rely on Haar cascades for facial
detection.

-   Only frontal faces are detected

-   The resolution of faces in the video is very low

Full Body Features
==================

Pedestrian Detection
--------------------

There are various difficulties in localizing pedestrians in an image.
These can be broadly classified into mainly Illumination, Occlusion,
scales, clutter in the background, variable appearances and the
different human poses. We have used the famous Histogram of Oriented
Gradients [^dalal2005histograms] for Human detection. The pipeline briefly
has the following steps: Scan image at all possible scales and
locations, then extract features over these windows and run Linear SVM ,
then fuse the multiple detections that we have found in 3D space for
scale and position and we finally get the true bounding box for the
detections. Dalal tried to optimize each of these steps and used every
possible regularization at each step. For the learning part, first a
fixed resolution and normalized training image data set is created and
after encoding images into feature spaces, a binary classifier is
learnt. [^PapEvg98]

Data Set Used
-------------

![image]({{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/24.png)
MIT Pedestrian Dataset was used[^mitdataset]

Results
-------

<table>
<thead>
<tr>
<th>Classifier</th>
<th>HOG Descriptor</th>
<th>Pixel Values</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>LinearSVC</td>
<td><span class="math inline">0.75 ± 0.04</span></td>
<td><span class="math inline">0.63 ± 0.05</span></td>
</tr>
<tr class="even">
<td>Random Forest</td>
<td><span class="math inline">0.67 ± 0.04</span></td>
<td><span class="math inline">0.60 ± 0.05</span></td>
</tr>
<tr class="odd">
<td>Perceptron</td>
<td><span class="math inline">0.69 ± 0.09</span></td>
<td><span class="math inline">0.63 ± 0.09</span></td>
</tr>
<tr class="even">
<td>Adaboost</td>
<td><span class="math inline">0.71 ± 0.05</span></td>
<td><span class="math inline">0.65 ± 0.04</span></td>
</tr>
<tr class="odd">
<td>MultinomialNB</td>
<td><span class="math inline">0.63 ± 0.04</span></td>
<td><span class="math inline">0.53 ± 0.04</span></td>
</tr>
</tbody>
</table>

Online Port
-----------

![image]({{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/12.png)

Demonstration
-------------

As the human recognition algorithm detects humans in general, it could
detect people driving their bycycles too. It can bee seen that this was
very much a possible result. The redbox around the woman’s body indicates that here sex is female
based on her full body features.
<div>
<img src="{{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/42.png" />
</div>

Motion Based Features
=====================

Gait[^han2006individual] is defined as the combination of coordinated
cyclic movements are that result in human locomotion, which includes
walking, running, jogging and climbing stairs. Gait of a person on foot
is often used to exploiting process information in some situations, for
example when the face is not visible. In a video of a person walking,
the gait cycle can be designated as the time interval between two
positions. Many factors affect the approach of a person, such as the
load, shoes, walking area, injury, mood, age and change over time. Video
analysis of this process will also deal with clothes for the camera,
walking speed and clutter background.

For our purpose gait images are background subtracted images of persons
motion across a scene at different times in an interval.

![image]({{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/10.jpg)
Data Set used is CASIA Gait Data Set[^gaitdataset]

From these gait images we’ll extract only the person/silhouette as it is
the only part that holds any feature relevant to our problem.

Gait Energy Image
-----------------

We define Gait Energy Image as the average of silhouettes in a gait/walk
cycle.[^yu2006framework] 

$$
F(i,j) = \frac{1}{T}\sum_{t=1}^{T}I(i,j,t)
$$

where $T$ is the number of frames in the sequence $I(i,j)$, $I(i,j,t)$
is the binary silhouttes image pixel at frame $t(i,j)$ with $i,j$ as
coordinates.

![image]({{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/7.png)

![image]({{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/8.png)

These are the extracted Gait Images. The last image in each row is the
Gait Enery Image of the corresponding row.

Classifiers
-----------

We’ve used multiple classifiers with GEI as the input vectors. SVM as
was expected is a very good classifiers for this two class problem.

<table>
<thead>
<tr>
<th>Classifier</th>
<th>HOG Descriptor</th>
<th>PCA Reduction</th>
<th>Raw GEI Values</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>LinearSVC</td>
<td><span class="math inline">0.83 ± 0.008</span></td>
<td><span class="math inline">0.90 ± 0.006</span></td>
<td><span class="math inline">0.91 ± 0.004</span></td>
</tr>
<tr class="even">
<td>Random Forest</td>
<td><span class="math inline">0.60 ± 0.008</span></td>
<td><span class="math inline">0.75 ± 0.020</span></td>
<td><span class="math inline">0.80 ± 0.030</span></td>
</tr>
<tr class="odd">
<td>Perceptron</td>
<td><span class="math inline">0.74 ± 0.030</span></td>
<td><span class="math inline">0.85 ± 0.010</span></td>
<td><span class="math inline">0.60 ± 0.030</span></td>
</tr>
<tr class="even">
<td>Adaboost</td>
<td><span class="math inline">0.66 ± 0.020</span></td>
<td><span class="math inline">0.79 ± 0.009</span></td>
<td><span class="math inline">0.82 ± 0.000</span></td>
</tr>
</tbody>
</table>

Online Port
-----------

![image]({{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/13.png)

Problem with an online version
------------------------------

-   To generate a Gait Energy Image, we need a set of gaits of
    the person.

-   The problem with generating such gaits, lies on three fronts.

-   Detection of Person

-   Background Subtraction

-   Tracking

Contribution of Halos and Cores in Gait Energy Images
-----------------------------------------------------
<div class="row" >
    <div class="col-md-6">
    <p>The images to right are normal gaits extracted. If we use these directly the accuracy is a bit low  70$\%$. 
    This might be because we are unable to quantify what stride to use.</p>
    </div>
    <div class="col-md-6">
    <img src="{{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/31.png" />
    </div>
</div>
<div class="row">
    <div class="col-md-6">
    <p>The images to right are Average gaits.
    As was reported they provide an accuracy of  91$\%$.
    </p>
    </div>
    <div class="col-md-6"><img src="{{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/32.png" /></div>
</div>
<div class="row">
    <div class="col-md-6">
    <p>The images to right are Halo subtracted Average gaits (Cores). These
    seem to capture the body features of an individual in a normalized
    fashion.
    <br>
    They surprisingly provide us with an accuracy of  87$\%$
    </p>
    </div>
    <div class="col-md-6"><img src="{{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/33.png" /></div>
</div>
<div class="row">
    <div class="col-md-6">
    <p>The images to right are just the Halos around the cores, they capture the
    body motions effectively.
    <br>
    Even they provide us an accuracy of  86$\%$.</p>
    </div>
    <div class="col-md-6"><img src="{{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/34.png" /></div>
</div>
<br>
As we can see the people’s strides could be random in single images but
on an average, it incorporates all the information about the pattern of
movement, thus Gait images provide us with good results.

The results above also suggest that the Halos as well as the cores
independently are capable of describing a person, with notable accuracy
(&gt; 85$\%$). When used together as is the case in Average gait image,
the information about an individual seems to have been boosted, hence
greater success rates.

Explained Variance for PCA reduction
------------------------------------

![image]({{ site.url }}/assets/posts/2016-04-09-can-we-discriminate/9.jpg)
Optimal Value of N turns out to be close to 30\
This gives us an idea that the entire motion can most probably be
described in 30 features.


Here's a presentation...

<iframe style="width: 100% !important; min-height:600px;" src="https://manikantareddyd.github.io/slides/Sex%20Classification/slides-gender-classification.html#/"></iframe>

<center>
<h2> Fork the code </h2>

<a href="https://github.com/HMAP/Online_Pedestrian_Sex_Identification" target="_blank"><i class="fa fa-3x fa-github"></i></a><br>
and a 
<a href="{{ site.url }}/reports/A Survey on Human Sex Determination Methods.pdf" target="_blank"><button class="btn btn-default">Report</button></a>
</center>

References
------------
[^ng2012vision]: Choon Boon Ng, Yong Haur Tay, and Bok Min Goi. Vision-based human gender recognition: A survey. arXiv preprint arXiv:1204.1611, 2012.
[^viola2001rapid]: Paul Viola and Michael Jones. Rapid object detection using a boosted cascade of simple features. In Computer Vision and Pattern Recognition, 2001. CVPR 2001. Proceedings of the 2001 IEEE Computer Society Conference on, volume 1, pages I–511. IEEE, 2001.
[^viola2004robust]: Paul Viola and Michael J Jones. Robust real-time face detection. International journal of computer vision, 57(2):137–154, 2004.
[^jolliffe2002principal]: Ian Jolliffe. Principal component analysis. Wiley Online Library, 2002.
[^turk1991face]: Matthew A Turk and Alex P Pentland. Face recognition using eigenfaces. In Computer Vision and Pattern Recognition, 1991. Proceedings CVPR’91., IEEE Computer Society Conference on, pages 586–591. IEEE, 1991.
[^dalal2005histograms]: Navneet Dalal and Bill Triggs. Histograms of oriented gradients for human detection. In Computer Vision and Pattern Recognition, 2005. CVPR 2005. IEEE Computer Society Conference on, volume 1, pages 886–893. IEEE, 2005.
[^PapEvg98]:  C. Papageorgiou, T. Evgeniou, and T. Poggio. A trainable pedestrian detection system. In Proceeding of Intelligent Vehicles, pages 241–246, October 1998.
[^nottinghamdataset]: University of Stirling. Nottingham Faces Dataset. http://pics.psych.stir.ac.uk/2D_face_sets.htm. Accessed: 2016-04-05.
[^faces94dataset]: Libor Spacek. Faces94 Faces Dataset. http://cswww.essex.ac.uk/mv/allfaces/faces94.html. Accessed: 2016-04-02.
[^lowe2004distinctive]:  David G Lowe. Distinctive image features from scale-invariant keypoints. International journal of computer vision, 60(2):91–110, 2004.
[^mitdataset]: MIT. MIT Pedestrian Data Set. http://cbcl.mit.edu/software-datasets/PedestrianData.html. Accessed: 2016-04-01.
[^han2006individual]: Jinguang Han and Bir Bhanu. Individual recognition using gait energy image. Pattern Analysis and Machine Intelligence, IEEE Transactions on, 28(2):316–322, 2006.
[^gaitdataset]:  Chinese Academy of Sciences (CASIA) Institute of Automation. CASIA Gait Dataset. http://www.cbsr.ia.ac.cn/english/Gait%20Databases. asp. Accessed: 2016-04-05.
[^yu2006framework]: Shiqi Yu, Daoliang Tan, and Tieniu Tan. A framework for evaluating the effect of view angle, clothing and carrying condition on gait recognition. In Pattern Recognition, 2006. ICPR 2006. 18th International Conference on, volume 4, pages 441–444. IEEE, 2006.