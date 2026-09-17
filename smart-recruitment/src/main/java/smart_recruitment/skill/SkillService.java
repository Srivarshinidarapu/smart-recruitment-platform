package smart_recruitment.skill;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smart_recruitment.skill.dto.SkillRequest;
import smart_recruitment.skill.dto.SkillResponse;

@Service
@Transactional
public class SkillService {

	private final SkillRepository skillRepository;

	public SkillService(SkillRepository skillRepository) {
		this.skillRepository = skillRepository;
	}

	public SkillResponse create(SkillRequest request) {
		String name = request.getName().trim();
		if (skillRepository.existsByNameIgnoreCase(name)) {
			throw new SkillAlreadyExistsException(name);
		}

		Skill skill = skillRepository.save(new Skill(name));
		return SkillResponse.from(skill);
	}

	@Transactional(readOnly = true)
	public List<SkillResponse> findAll() {
		return skillRepository.findAll()
				.stream()
				.map(SkillResponse::from)
				.toList();
	}

	@Transactional(readOnly = true)
	public SkillResponse findById(Long id) {
		Skill skill = skillRepository.findById(id)
				.orElseThrow(() -> new SkillNotFoundException(id));
		return SkillResponse.from(skill);
	}

	public SkillResponse update(Long id, SkillRequest request) {
		Skill skill = skillRepository.findById(id)
				.orElseThrow(() -> new SkillNotFoundException(id));

		String name = request.getName().trim();
		if (skillRepository.existsByNameIgnoreCaseAndIdNot(name, id)) {
			throw new SkillAlreadyExistsException(name);
		}

		skill.setName(name);
		return SkillResponse.from(skillRepository.save(skill));
	}

	public void delete(Long id) {
		if (!skillRepository.existsById(id)) {
			throw new SkillNotFoundException(id);
		}
		skillRepository.deleteById(id);
	}
}
