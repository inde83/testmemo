var app=angular.module("memoapp",[]);

app.controller("memoController",function($scope,$http)
{
	$scope.mode="new";
	$scope.editid="";
	$scope.init=function()
	{
		$scope.load();
	}
	//메모 입력
	$scope.send=function()
	{
		if($scope.memo)
		{
			$http.post('/memo',{memo:$scope.memo}).then(function(response){
				if(response.data.status>0)
				{
					alert(response.data.message);
				}else{
					$scope.load();
					$scope.memo="";
				}
			});
		}else{
			alert('내용을 입력하세요.');
			return;
		}
	}
	//메모목록 가져오기
	$scope.load=function()
	{
		$http.get('/memo',{}).then(function(response){
			 if(response.data.status>0)
                         {
                         	alert(response.data.message);
                         }else{
				$scope.list=response.data.list;
			 }
		});
	}
	//보기
	$scope.read=function(memo)
	{
		$scope.memo=memo;
	}
	//삭제
	$scope.delete=function(_id)
	{
		if(confirm('정말로 삭제 하시겠습니까?')){
			$http.delete('/memo/'+_id).then(function(response)
			{
				if(response.data.status>0)
                                {
                                        alert(response.data.message);
                                }else{
                                        $scope.load();
                                }

			});
		}
	}
	//수정 전송
	$scope.edit=function()
	{
	        if($scope.memo)
                {
                        $http.put('/memo',{_id:$scope.editid,memo:$scope.memo}).then(function(response){
                                if(response.data.status>0)
                                {
                                        alert(response.data.message);
                                }else{
                                        $scope.load();
                                        $scope.memo="";
					$scope.cancel();
                                }
                        });
                }else{
                        alert('내용을 입력하세요.');
                        return;
                }
		
	}
	//수정 선택
	$scope.selectedit=function(_id,memo)
	{
		$scope.editid=_id;
		$scope.memo=memo;
		$scope.mode="edit";
	}
	//수정 취소
	$scope.cancel=function()
	{
		$scope.mode="new";
		$scope.editid="";
	}
});

