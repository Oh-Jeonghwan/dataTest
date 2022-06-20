/**
 * 
 */
let board = {
	formData:function(){
		let form = $("#formData")[0];
		let formData = new FormData(form);
		console.log(formData);
		  for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
		$.ajax({
			url:"/test/formData",
			type:"post",
			data: formData,
			//contentType:false,
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
	},
	
	requestBody:function(){
		let form = $("#requestBody")[0];
		let formData = new FormData(form);
		console.log(formData);
		let data={
			title:$("#title").val(),
			content:$("#content").val()
		}
		console.log(JSON.stringify(data));
		$.ajax({
			url:"/test/requestBody",
			type:"delete",
			//data:formData,
			data:JSON.stringify(data),
			//data:formData,
			contentType:"application/json; charset=utf-8",
			//contentType:false,
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
		let form = $("#ajaxGet")[0];
		let formData = new FormData(form);
		let title=$("#agtitle").val();
		let content=$("#agcontent").val();
		let data = {title:title, content:content};
		//let parseData = JSON.stringify(data);
		//console.log(parseData);
		$.ajax({
			url:"/test/ajaxGet",
			type:"delete",
			data:formData,
			//data:JSON.stringify(data),
			//contentType:"application/json; charset=utf-8", 
			//이게 뭐?
			//contentType: false,
			//processData: false, 
			//cache: false,
			//dataType:"json", 
			success:function(data){
				alert(data);
				//location.href="/test/form";
			},
			error:function(data){
				console.log(data);
			}
		});
	},
	
	multiget:function(){
		let form = $("#multiGet")[0];
		let formData = new FormData(form);
		let data={
			title:$("#mtitle").val(),
			content:$("#mcontent").val()
		}
		$.ajax({
			url:"/test/multiget?title=asdf&content=asdf",
			type:"delete",
			//data:data,
			data:formData,
			//contentType:"application/json; charset=utf-8", 
			//이게 뭐?
			contentType: false,
			processData: false, 
			//cache: false,
			dataType:"json", 
			success:function(data){
				alert(data);
				//location.href="/test/form";
			},
			error:function(data){
				console.log(data);
			}
		});
	}
	
}