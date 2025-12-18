package com.example.pathsysts;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/landing")
@CrossOrigin(origins="http://localhost:3000")
public class LandingController {

    private final LandingRepo lr;

    public LandingController(LandingRepo lr) {
        this.lr = lr;
    }

    @GetMapping("/")
    public List<Landing> getAllLanding() {
        return lr.findAll();
    }
}
