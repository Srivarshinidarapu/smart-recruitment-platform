package smart_recruitment.skill.dto;

import smart_recruitment.skill.Skill;

public class SkillResponse {

	private Long id;
	private String name;

	public SkillResponse(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public static SkillResponse from(Skill skill) {
		return new SkillResponse(skill.getId(), skill.getName());
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}
}
