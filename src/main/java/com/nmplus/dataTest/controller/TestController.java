package com.nmplus.dataTest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.nmplus.dataTest.vo.Board;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/test")
public class TestController {
	@GetMapping("/form")
	public String form() {
		return "edit";
	}
	
	@GetMapping("/getForm")
	public String getForm(@RequestBody Board board){
		
		return "redirect:/test/form";
	}
	
	@PostMapping("/basicForm")
	public String basicForm(@RequestParam String title
						  , @RequestParam String content){
		log.debug("asdf: " + title);
		return "redirect:/test/form";
	}
	
	@PostMapping("/multiForm")
	public String multiForm(@RequestParam String title,
							@RequestParam String content
							, @RequestParam MultipartFile[] upfile
						   //,@ModelAttribute Board board 
						  //, @RequestPart UploadVo uploadVo
						  ) {
		//@ReuqestParam은 파일을 받을 수 있다.
		//@RequestBody로 보낼 때는 json 형식의 ContentType와 자바단에 생성자가 있는 데이터만 받는다?
	//	Long length = uploadVo.getUpfile().get(0).getSize();
		Long length = upfile[0].getSize();
		log.debug("asdf: " + length);
		return "redirect:/test/form";
	}
	
	@ResponseBody
	@PostMapping("/formData")
	public Board formData(@RequestParam("title") String title,
						  @RequestParam("content") String content
						 ) {
		Board board = new Board(title, content);
		return board;
	}
	
	@GetMapping("/consBasicForm")
	public String consBasicForm(@ModelAttribute Board board) {
		//ModelAttribute는 setter가 없다면 값이 보내지기는 하지만 보내진 값이 쓰여지지 않아 null로 들어오게 된다.
		log.debug("board: "+board);
		return "redirect:/test/form";
	}
	
	@ResponseBody
	@PutMapping("/requestBody")
	public Board requestBody(@RequestBody Board board
							, @RequestBody MultipartFile[] upfile) {
		log.debug("asdf: "+ board);
		//submit=>값이 찍히긴 하지만 415 오류 json이 아니리서 requestBody가 파싱 못 해줌
		return board;
	}
	
	@ResponseBody
	@DeleteMapping("/ajaxGet")
	public Board ajaxGet(
			@RequestParam String title,
			@RequestParam String content
			) {
		Board board = new Board(title, content);
		log.debug("asdf"+board);
		return board;
	}
	
	@ResponseBody
	@DeleteMapping("/multiget")
	public Board multiget(@ModelAttribute Board board
						, @ModelAttribute MultipartFile[] upfile) {
		log.debug("asdf"+board);
		//log.debug("asdf: "+upfile[0].getOriginalFilename());
		//Board board = new Board(title, content);
		return board;
	}
}
