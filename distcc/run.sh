docker run -it -d -v /Users/peizhilin/Desktop/:/data -p 5253:5253 -p 32768:32768 -p 3632:3632 -p 1234:1234 --name=dist2 --net=host dist_cc bash 
#docker run -it -d -v /Users/peizhilin/Desktop/:/data -p 5254:5253 -p 32769:32768 -p 3633:3633 -p 1235:1234 --name=dist1 --net=host dist_cc bash
docker run -it -d -v /Users/peizhilin/Desktop/:/data --name=client --net=host dist_cc bash
