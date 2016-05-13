library(dplyr)
library(stringr)
library(ggplot2)
#library(animation)
#cl<-kmeans.ani(scale,3)
data<-read.csv(file="/Users/divyachakkilam/Desktop/temp_20132011_1.csv", na.strings = "NULL")
library(NbClust)
set.seed(14)
nc <- NbClust(data, min.nc=2, max.nc=4, method="kmeans")
table(nc$Best.n[1,])
barplot(table(nc$Best.n[1,]),
        xlab="Numer of Clusters", ylab="Number of Criteria",
        main="Number of Clusters Chosen by 26 Criteria")
dt = sort(sample(nrow(data), nrow(data)*.7))
train<-data[dt,]

test2<-data[-dt,]
myres<-kmeans(train,3)

myres1<-kmeans(test2,3)
myres1$cluster
summary(myres1)
plot(test2[,2],col=myres1$cluster, main="PRE DOMINANT DEGREE",xlab="Observation",ylab="PREDDEG")
abline(v=c(100,200))
plot(test2[,5],col=myres1$cluster,main="EARNT", xlab="ob",yLab="EARN_2011")
plot(test2[,6],col=myres1$cluster,main="DEBT", xlab="ob",yLab="GRADE_DEBT_MDN")
plot(test2[,7],col=myres1$cluster,main="RPY_RT", xlab="ob",yLab="RPYT")
plot(train[,7],col=myres$cluster,main="Repayment_Rate", xlab="observation",yLab="RPY")
abline(v=c(100,200))
library(cluster)
clusplot(test2, myres1$cluster, color=TRUE, shade=TRUE, labels=2, lines=0)


clusters <- hclust(dist(test2[,4:7]))
plot(clusters)
clusterCut <- cutree(clusters, 3)
#table(clusterCut, test2$EARN_2011)
plot(test2)






