package com.sixcube.recletter.studio.controller;

import com.sixcube.recletter.studio.dto.Studio;
import com.sixcube.recletter.studio.dto.StudioInfo;
import com.sixcube.recletter.studio.dto.StudioParticipant;
import com.sixcube.recletter.studio.dto.res.SearchStudioListRes;
import com.sixcube.recletter.studio.repository.StudioParticipantRepository;
import com.sixcube.recletter.studio.repository.StudioRepository;
import com.sixcube.recletter.user.dto.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/studio")
@RequiredArgsConstructor
public class StudioController {

  private final StudioRepository studioRepository;
  private final StudioParticipantRepository studioParticipantRepository;

  // TODO - JPA 예외처리
  @GetMapping
  public ResponseEntity<SearchStudioListRes> searchStudioList(@AuthenticationPrincipal User user) {
    // 참가중인 Studio의 studioId 불러오기
    List<Integer> participantStudioList = studioParticipantRepository.findAllByUserId(
        user.getUserId()).stream().map(
        StudioParticipant::getStudioId).toList();

    // 참가중인 Studio 정보 불러오기
    List<Studio> studioList = studioRepository.findByStudioIdIn(participantStudioList);

    SearchStudioListRes result = new SearchStudioListRes();

    // TODO - 가지고 있는 clip을 불러오고, 그중 처음에 위치하는 clip의 thumbnailUrl 가져와 삽입
    // TODO - studioId로 clip을 조회하고, 그 중에 clipOwner가 userId인 clip이 있는지 확인하여 isUpload에 삽입
    // 불러온 Studio들을 통해 StudioInfo List 생성후 할당.
    result.setStudioInfoList(
        studioList.stream().map(studio -> StudioInfo.builder()
              .studioId(studio.getStudioId())
              .studioTitle(studio.getStudioTitle())
              .isStudioOwner(user.getUserId().equals(studio.getStudioOwner()))
              .isCompleted(studio.getIsCompleted())
              .thumbnailUrl("")
              .expireDate(studio.getExpireDate())
              .isUpload(false)
              .build()
        ).toList()
    );

    return ResponseEntity.ok().body(result);
  }

  @GetMapping("/{studiId}")
  public ResponseEntity<> searchStudioDetail(@PathVariable Integer studiId) {

  }

  @GetMapping("/{studioId}/thumbnail")
  public ResponseEntity<> searchStudioThumbnail(@PathVariable Integer studioId) {

  }

  @PostMapping
  public ResponseEntity<> createStudio() {

  }

  @DeleteMapping("/{studioId")
  public ResponseEntity<> deleteStudio(@PathVariable Integer studioId) {

  }

  @PostMapping("/{studioId")
  public ResponseEntity<> joinStudio(@PathVariable Integer studioId) {

  }

  @GetMapping("/{studioId}/active")
  public ResponseEntity<> searchActiveUser() {

  }

  @PutMapping("/studio/{studioId}/title")
  public ResponseEntity<> updateStudioTitle(@PathVariable Integer studioId,
      @RequestParam String studioTitle) {

  }


}