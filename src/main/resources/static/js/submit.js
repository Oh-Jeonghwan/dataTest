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
		let title = $("#agtitle").val();
		let content = $("#agcontent").val();
		$.ajax({
			url:"/test/ajaxGet",
		});
	}
}