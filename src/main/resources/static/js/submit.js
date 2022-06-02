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
			data:JSON.stringify({
				title:title,
				content:content
			}),
			contentType:"application/json; charset=utf-8",
			dataType:"json",
			success:function(data){
				alert(data);
			},
			error:function(data){
				console.log(data);
			}
		});
	}
}