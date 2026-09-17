package smart_recruitment.skill;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class SkillAlreadyExistsException extends RuntimeException {

	public SkillAlreadyExistsException(String name) {
		super("Skill already exists with name: " + name);
	}
}
