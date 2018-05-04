		/* using indexs for batsmen and names for bowler */
		var app = angular.module("app",['ngSanitize']);
		app.controller("cricket",function($scope,$http,$window,$filter){	
			$scope.page = "p1";					//to navigate from one page to another page
			$scope.overs = 0.0					//to calculAte no of overs
					//to set overs limit
			$scope.thisover = 0.0				//to handle individual overs
			$scope.count=0							
			$scope.overar ={0:-1,1:-1,2:-1,3:-1,4:-1,5:-1} //to collect balls result in an over
			$scope.balcount=0;				//for balls count
			$scope.striker 		//to handle striker index
			$scope.nonstriker 				//to handle nonstriker index
			$scope.wickets=0			//for wicket count
			$scope.Innigs=0					//for innings count
			$scope.target=100000000			//for 2nd inning target					
			$scope.runs = 0
			$scope.selection =2
			$scope.display_swap = true
			$scope.previous_bowler=""
			$scope.toss = undefined
			$scope.num_balls =0
			$scope.num_overs = [2,5,10,15,20,15,20,25,30,35,40,45,50]
			/* teamplayer is a dataset handle complete details of indiviual players
				teama : carries team-A data
				teamb : carries team-B data
							name : for player name,
							runs : for player runs,
							wickets : to calculate bowler wickets count,
							ball_runs : total no of runs given by bowler,
							balls : no of balls by bowler,
							catch : if he is catch out by opp name,
							stump : if he is stump out by opp name,
							throw : if he is throw out by opp name,
							visited : if batsmen visited then it is true			
			 */	
			$scope.teamplayer = {
							"teama":{
										0:{"name":"saketh","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},//
										1:{"name":"vinay","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},//
										2:{"name":"vikram","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},//
										3:{"name":"nanda","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},//
										4:{"name":"sastri","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},//
										5:{"name":"nagendra","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},//
										6:{"name":"dhoni","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										7:{"name":"dravid","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},//
										8:{"name":"ashwin","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										9:{"name":"kumble","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										10:{"name":"yuvaraj","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false}
									},
							"teamb":{
										0:{"name":"kalyan","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										1:{"name":"ravi","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										2:{"name":"ganguly","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										3:{"name":"nagarjuna","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										4:{"name":"jadega","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										5:{"name":"kohili","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										6:{"name":"abd","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										7:{"name":"raina","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										8:{"name":"gavaskar","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										9:{"name":"bumrah","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false},
										10:{"name":"pandey","runs":0,"wickets":0,"ball_runs":0,"balls":0,"bowling_balls":0,"catch":undefined,"stump":undefined,"throw":undefined,"wicket":undefined,"visited":false}
									}
							}
			/*
				teama : handle team-A brief data
				teaab : handle team-B brief data
					name : for team name
					score : for team score
					wickets : for team wickets
					captian : for captian name
					wiki : for wiki-keeper name
			*/
			$scope.team = {
							"teama":{"name":"Chennai","score":0,"wickets":0,"captian":"saketh","wiki":"dhoni"},
							"teamb":{"name":"Kolkatta","score":0,"wickets":0,"captian":"kalyan","wiki":"abd"},
							"overs":2
							};
			/* 		 score fuction to navigate to p2		*/
			$scope.navigate = function(a){
				$scope.page = a
			}
			$scope.wide = function(a)
			{
				$scope.team[$scope.batting].score += a
				$scope.page = 'p3'
			}
			$scope.swap = function()
			{
				var temp
				temp = $scope.nonstriker
				$scope.nonstriker = $scope.striker
				$scope.striker = temp
				$scope.display_swap = false
			}
			$scope.out = function(a,b,runs,outer)
			{
				if(a == "runout" && $scope.runs < 0)
					return
				if(a=="stump")
				{
					$scope.teamplayer[$scope.batting][$scope.striker].balls += 1
					$scope.teamplayer[$scope.batting][$scope.striker].stump = $scope.team[$scope.bowling].wiki
					$scope.teamplayer[$scope.batting][$scope.striker].runs += 0
					$scope.teamplayer[$scope.bowling][$scope.bowler].ball_runs += 0
					$scope.teamplayer[$scope.bowling][$scope.bowler].bowling_balls += 1
				}
				else if(a=="wicket")
				{
					$scope.teamplayer[$scope.batting][$scope.striker].balls += 1
					$scope.teamplayer[$scope.batting][$scope.striker].wicket = $scope.teamplayer[$scope.bowling][$scope.bowler].name
					$scope.teamplayer[$scope.batting][$scope.striker].runs += 0
					$scope.teamplayer[$scope.bowling][$scope.bowler].ball_runs += 0
					$scope.teamplayer[$scope.bowling][$scope.bowler].bowling_balls += 1
				}
				else if(a=="catch")
				{
					$scope.teamplayer[$scope.batting][$scope.striker].balls += 1
					$scope.teamplayer[$scope.batting][$scope.striker].wicket = $scope.teamplayer[$scope.bowling][$scope.bowler].name
					$scope.teamplayer[$scope.batting][$scope.striker].catch = $scope.teamplayer[$scope.bowling][b].name //who catched (b)
					$scope.teamplayer[$scope.batting][$scope.striker].runs += runs
					$scope.teamplayer[$scope.batting][$scope.striker].balls += 1
					$scope.teamplayer[$scope.bowling][$scope.bowler].ball_runs += runs
					$scope.teamplayer[$scope.bowling][$scope.bowler].bowling_balls += 1
				}
				else if(a=="runout")
				{
					$scope.teamplayer[$scope.batting][$scope.striker].balls += 1
					$scope.teamplayer[$scope.batting][outer].wicket = $scope.teamplayer[$scope.bowling][$scope.bowler].name
					$scope.teamplayer[$scope.batting][outer].throw = $scope.teamplayer[$scope.bowling][b].name //who throws ball (b)
					$scope.teamplayer[$scope.batting][$scope.striker].runs += runs
					$scope.teamplayer[$scope.bowling][$scope.bowler].ball_runs += runs
					$scope.teamplayer[$scope.bowling][$scope.bowler].bowling_balls += 1
					if($scope.nonstriker == outer)
					{
						var temp = $scope.striker
						$scope.striker = outer
						$scope.nonstriker = temp
					}
				}
				$scope.teamplayer[$scope.bowling][$scope.bowler].wickets +=1
				$scope.team[$scope.batting].wickets +=1
				$scope.balcount += 1
				$scope.team[$scope.batting].score += runs
				$scope.thisover += 0.1
				$scope.overar[$scope.balcount]=-2
				$scope.overs = $scope.count+$scope.thisover
				$scope.runs = 0
				$scope.display_swap = true
				$scope.wickets++
				if($scope.wickets!=10 )
				{
					$scope.page = 'batsmen'
					$scope.selection = 4
				}
				else
				{
					$scope.reset()
					$scope.page = 'batsmen'
					$scope.selection = 2					
					$scope.wickets=0
					if($scope.Innigs ==2)
					{
						$scope.page="p4"
						if($scope.team[$scope.batting].score > $scope.team[$scope.bowling].score)
						{
							$scope.winner = $scope.team[$scope.batting].name + " Won By "+($scope.team[$scope.batting].score-$scope.team[$scope.bowling].score)+ " Runs"     /* 1st bat team wins */
						}
						else if($scope.team[$scope.batting].score == $scope.team[$scope.bowling].score)
						{
							$scope.winner = "Draw Match"
						}
						else
						{
							$scope.winner = $scope.team[$scope.bowling].name + " Won By "+(10-$scope.team[$scope.bowling].wickets)+ " Wickets"
						}
					}
				}
				if($scope.thisover == 0.5)
				{
					var temp = $scope.nonstriker
					$scope.nonstriker = $scope.striker
					$scope.striker = temp
				}
				$scope.num_balls++
			}
			$scope.reset = function () 
			{
				$scope.target = $scope.team[$scope.batting].score
				$scope.Innigs++
				$scope.overs=0.0
				$scope.thisover = 0.0
				$scope.count=0
				$scope.num_balls = 0
				$scope.overar ={0:-1,1:-1,2:-1,3:-1,4:-1,5:-1}
				$scope.balcount=0;
				var temp = $scope.batting
				$scope.batting = $scope.bowling
				$scope.bowling = temp
				$scope.wickets = 0
				
			}
			$scope.set = function(a,b,c,type)
			{
				if((type=="opening") && (a != undefined && b!=undefined && c != undefined) && (a!=b))	 // opening selection
				{
					$scope.striker = a
					$scope.nonstriker = b
					$scope.bowler = c
					$scope.teamplayer[$scope.batting][$scope.striker].visited = true
					$scope.teamplayer[$scope.batting][$scope.nonstriker].visited = true
					$scope.page = "p3"
					$scope.com = "<b>" + $scope.teamplayer[$scope.batting][$scope.striker].name + " and " + $scope.teamplayer[$scope.batting][$scope.nonstriker].name + " are the openers" + $scope.com
					$scope.com = "<b>" + $scope.teamplayer[$scope.bowling][$scope.bowler].name + " has came to ATTACK!!!</b><br>"+$scope.com
				}
				else if(type=="bowler" && c !=undefined) //bowler
				{
					$scope.bowler = c
					$scope.previous_bowler = $scope.teamplayer[$scope.bowling][c].name
					$scope.page = "p3"
					$scope.teamplayer[$scope.batting][$scope.striker].visited = true
					$scope.teamplayer[$scope.batting][$scope.nonstriker].visited = true
					$scope.thisover = 0.0
					$scope.overs += 0.4
					$scope.count++
					$scope.overar ={0:-1,1:-1,2:-1,3:-1,4:-1,5:-1}
					$scope.balcount =0;
					$scope.com = "<b>"+ $scope.teamplayer[$scope.bowling][$scope.bowler].name + " has came to ATTACK!!!</b><br>"+$scope.com
				}
				else if(type=="bowbat" && a != undefined && c != undefined) //overup and wicket
				{
					$scope.striker = a
					$scope.bowler = c
					$scope.previous_bowler = $scope.teamplayer[$scope.bowling][c].name
					$scope.page = "p3"
					$scope.teamplayer[$scope.batting][$scope.striker].visited = true
					$scope.teamplayer[$scope.batting][$scope.nonstriker].visited = true
					$scope.thisover = 0.0
					$scope.overs += 0.4
					$scope.count++  
					$scope.overar ={0:-1,1:-1,2:-1,3:-1,4:-1,5:-1}
					$scope.balcount =0;
					var temp = $scope.nonstriker
					$scope.nonstriker = $scope.striker
					$scope.striker = temp
					$scope.com = "<b>" + $scope.teamplayer[$scope.bowling][$scope.bowler].name + " has came to ATTACK!!!</b><br>"+$scope.com
					$scope.com = "<b>" + $scope.teamplayer[$scope.batting][$scope.nonstriker].name + " has came to Feild </b><br>"+$scope.com
				}
				else if(type=="wicket" && a != undefined) // batsmen selection page
				{
					$scope.striker = a
					$scope.page = "p3"
					$scope.teamplayer[$scope.batting][$scope.striker].visited = true
					$scope.com = "<b>" + $filter('number')($scope.overs, 1) + "&nbsp;&nbsp;" +  $scope.teamplayer[$scope.batting][$scope.striker].name + " has came to Feild </b><br>"+$scope.com
				}
				if($scope.wickets==10 || $scope.num_balls == $scope.opt * 6) //executes if wkts = 10 or target is chased (reset every one)
				{
					//reset
					$scope.reset()
					$scope.page = "batsmen"
					$scope.selection = 2
					if($scope.Innigs ==2)
					{
						$scope.page="p4"
						if($scope.team[$scope.batting].score > $scope.team[$scope.bowling].score)
						{
							$scope.winner = $scope.team[$scope.batting].name + " Won By "+($scope.team[$scope.batting].score-$scope.team[$scope.bowling].score)+ " Runs"     /* 1st bat team wins */
						}
						else if($scope.team[$scope.batting].score == $scope.team[$scope.bowling].score)
						{
							$scope.winner = "Draw Match"
						}
						else
						{
							$scope.winner = $scope.team[$scope.bowling].name + " Won By "+(10-$scope.team[$scope.bowling].wickets)+ " Wickets"
						}
					}
				}   
			}
			$scope.indexOf = function (element,key) 
			{
  				for (var i = 0; i <= 10; i++) 
  				{
    				if (element[i].name == key) 
    				{
    				 return i; 
    				}
  				}
  				return -1;
			}
			let getmsg = function(a){
				let msg = ""
				if(a == 0){
					msg = "its an Dot <b>[0]</b>"
				}
				else if(a == 4){
					msg = "Hurray its a \"Four\" well play <b>" + $scope.teamplayer[$scope.batting][$scope.striker].name + "</b>"
				}
				else if(a == 6){
					msg = "OMG!!! Maximum Shot its a \"Six\" Good Shot <b>" + $scope.teamplayer[$scope.batting][$scope.striker].name + "</b>"
				}
				else{
					msg = "has <b>" + a + "</b> runs"
				}
				return msg
			}
						/*   update is for ball     */
			$scope.update = function(a) //mainly focus on batting side
			{
				console.log($scope)
				$scope.display_swap = false
				$scope.num_balls++
				if($scope.thisover == 0.5)
				{
					$scope.com = "<b>" +$filter('number')($scope.overs, 1) +  "</b> <center>" + $scope.teamplayer[$scope.bowling][$scope.bowler].name + " to " + $scope.teamplayer[$scope.batting][$scope.striker].name + " : " +  getmsg(a) + "</center><br>" + $scope.com
					$scope.com = "Overup!!!<br>" + $scope.com 
					$scope.balcount += 1
					$scope.team[$scope.batting].score += a
					$scope.thisover += 0.1
					$scope.overar[$scope.balcount]=a
					$scope.overs = $scope.count+$scope.thisover
					$scope.teamplayer[$scope.batting][$scope.striker].runs += a
					$scope.teamplayer[$scope.batting][$scope.striker].balls += 1
					$scope.teamplayer[$scope.bowling][$scope.bowler].ball_runs += a
					$scope.teamplayer[$scope.bowling][$scope.bowler].bowling_balls += 1
					$scope.selection = 3
					$scope.page = 'batsmen'
					var temp = $scope.nonstriker
					$scope.nonstriker = $scope.striker
					$scope.striker = temp

				}

				 else if(a != -1)  //update score and balls player individual score (batsmen)
				{
					
					$scope.balcount += 1
					$scope.team[$scope.batting].score += a
					$scope.thisover += 0.1
					$scope.overar[$scope.balcount]=a
					$scope.overs = $scope.count+$scope.thisover
					$scope.teamplayer[$scope.batting][$scope.striker].runs += a
					$scope.teamplayer[$scope.batting][$scope.striker].balls += 1
					$scope.teamplayer[$scope.bowling][$scope.bowler].ball_runs += a
					$scope.teamplayer[$scope.bowling][$scope.bowler].bowling_balls += 1
					$scope.com = "<b>" +$filter('number')($scope.overs, 1) +  "</b> <center>" + $scope.teamplayer[$scope.bowling][$scope.bowler].name + " to " + $scope.teamplayer[$scope.batting][$scope.striker].name + " : " +  getmsg(a) + "</center><br>" + $scope.com

				}
				if(a%2==1)			//executes if over up or odd runs by batting rteam
				{
					var temp;
					temp = $scope.striker
					$scope.striker = $scope.nonstriker
					$scope.nonstriker = temp
					
				}

				if($scope.target < $scope.team[$scope.batting].score || $scope.opt * 6 < $scope.num_balls ) //executes if wkts = 10 or target is chased (reset every one)
				{
					$scope.reset()
					$scope.page = 'batsmen'
					$scope.selection = 2
					if($scope.Innigs ==2)
					{
						$scope.page="p4"
						if($scope.team[$scope.batting].score > $scope.team[$scope.bowling].score)
						{
							$scope.winner = $scope.team[$scope.batting].name + " Won By "+($scope.team[$scope.batting].score-$scope.team[$scope.bowling].score)+ " Runs"     /* 1st bat team wins */
						}
						else if($scope.team[$scope.batting].score == $scope.team[$scope.bowling].score)
						{
							$scope.winner = "Draw Match"
						}
						else
						{
							$scope.winner = $scope.team[$scope.bowling].name + " Won By "+(10-$scope.team[$scope.bowling].wickets)+ " Wickets"
						}
					}

				}   
			}
			/*		Random is to get random value		*/
			$scope.random = function(){
				var d = new Date();
				var n = d.getMilliseconds();
				n = d.getMilliseconds() + 111 * 221 
				if(n%2 == 1)
					return "head"
				else
					return "tail"
			}
			/*		function for toss	 */
			$scope.tossfun = function(a){
				$scope.opt = Number($scope.team.overs)
				if($scope.b < 2)
					return
				if(a == $scope.random())
				{
					$scope.toss = $scope.team.teama['name']
					$scope.nontoss = $scope.team.teamb['name']
				}
				else
				{
					$scope.toss = $scope.team.teamb['name']	
					$scope.nontoss = $scope.team.teama['name']
				}
			}
			$scope.setteam = function (a)
			 {
					$scope.com = (a=="batting" ? "Bat" : " Feild")
					$scope.com = "<center><b>" + $scope.toss + "</b>" + " has won the toss and choose to " + $scope.com + " <b>first</b></center>"
			 		if($scope.toss == $scope.team['teama'].name)
					{
						$scope.toss = 'teama'
						$scope.nontoss = 'teamb'
					}
					else
					{
						$scope.toss = 'teamb'
						$scope.nontoss = 'teama'
					}
					if(a=='batting')
					{

						$scope.batting = $scope.toss
						$scope.bowling = $scope.nontoss
					}
					else
					{
						$scope.bowling = $scope.toss
						$scope.batting = $scope.nontoss
					}
					$scope.navigate('batsmen')
					$scope.selection = 2
			}
		})
