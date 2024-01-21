package com.sixcube.recletter.studio.dto.req;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateStudioReq {
  private String studioTitle;
  private Integer studioFrameId;
  private LocalDateTime expireDate;
}