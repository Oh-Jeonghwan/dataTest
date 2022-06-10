/**
 * 
 */
let board = {
	clickSubmit:function(){
		let data={
			"title":$("#title").val(),
			"content":$("#content").val()
		}
		console.log(JSON.stringify(data));
		$.ajax({
			url:"/test/requestBody",
			type:"post",
			data:JSON.stringify(data),
			contentType:"application/json; charset=utf-8",
			dataType:"json",
			processData: false,
			success:function(data){
				alert(data);
				location.href="/test/form";
			},
			error:function(data){
				console.log(data);
			}
		});
	},
	
	ajaxGet:function(){
		let title=$("#agtitle").val();
		let content=$("#agcontent").val();
		let data = {title:title, content:content};
		let parseData = JSON.stringify(data);
		console.log(parseData);
		$.ajax({
			url:"/test/ajaxGet",
			type:"get",
			//data:data,
			data:data,
			contentType:"application/json; charset=utf-8", 
			//이게 뭐?
			//contentType: false,
			//processData: false, 
			//cache: false,
			dataType:"json", 
			success:function(data){
				alert(data);
				location.href="/test/form";
			},
			error:function(data){
				console.log(data);
			}
		});
	},
	
	multiget:function(){
		let data={
			title:$("#mtitle").val(),
			content:$("#mcontent").val()
		}
		console.log(JSON.stringify(data));
		$.ajax({
			url:"/test/multiget",
			type:"get",
			//data:data,
			data:data,
			//contentType:"application/json; charset=utf-8", 
			//이게 뭐?
			//contentType: false,
			//processData: false, 
			//cache: false,
			dataType:"json", 
			success:function(data){
				alert(data);
				location.href="/test/form";
			},
			error:function(data){
				console.log(data);
			}
		});
	},
	
	formData:function(){
		let form = $("#formData")[0];
		let formData = new FormData(form);
		console.log(formData);
		$.ajax({
			url:"/test/formData",
			type:"post",
			data: formData,
			cache:false,
			chtentType:false,
			processData:false,
			dataType:"json",
			success:function(data){
					alert(data);
				location.href="/test/form";
			},
			error:function(data){
				console.log(data);
			}
		});
	}
}