package com.nmplus.dataTest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.nmplus.dataTest.vo.Board;
import com.nmplus.dataTest.vo.UploadVo;

@Controller
@RequestMapping("/test")
public class TestController {
	@GetMapping("/form")
	public String form() {
		return "edit";
	}
	
	@PostMapping("/basicForm")
	public String basicForm(@RequestParam String name
						  , @RequestParam String hobby){
		
		return "edit";
	}
	
	@PostMapping("/multiForm")
	public String multiForm(@RequestParam String title,
							@RequestParam String content,
							@RequestPart MultipartFile[] upfile) {
		//@ReuqestParam은 파일을 받을 수 있다.
		//@RequestBody로 보낼 때는 json 형식의 ContentType와 자바단에 생성자가 있는 데이터만 받는다?
		return "edit";
	}
	
	@PostMapping("/consBasicForm")
	public String consBasicForm(@ModelAttribute Board board) {
		//ModelAttribute는 setter가 없다면 값이 보내지기는 하지만 보내진 값이 쓰여지지 않아 null로 들어오게 된다.
		return "edit";
	}
	
	@ResponseBody
	@PostMapping("/requestBody")
	public Board requestBody(@RequestBody Board board) {
		//submit=>값이 찍히긴 하지만 415 오류 json이 아니리서 requestBody가 파싱 못 해줌
		return board;
	}
	
}
