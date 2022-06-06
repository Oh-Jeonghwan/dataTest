/**
 * 
 */
let board = {
	clickSubmit:function(){
		let form = $("#requestBody")[0];
		let formData = new FormData(form);
		let title = $("#title").val();
		let content = $("#content").val();
		$.ajax({
			url:"/test/requestBody",
			type:"post",
			data:JSON.stringify(formData),
			contentType:"application/json; charset=utf-8",
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
	
	ajaxGet:function(){
		let form = $("#ajaxGet")[0];
		let formData = new FormData(form);
		console.log(formData);
		$.ajax({
			url:"/test/ajaxGet",
			type:"get",
			data:formData, 
			//이게 뭐?
			//contentType: false, 
			processData: false, 
			//cache: false, 
			success:function(data){
				alert(data);
			},
			error:function(data){
				console.log(data);
			}
		});
	}
}