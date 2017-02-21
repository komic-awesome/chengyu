jest.unmock('../splitSentence.js')

import splitSentence from '../splitSentence'

test('Split sentences', () => {
  let text = '影像感知来自于两个方面，一个是摄影机，一个是角色。因而，感知的失效也就有两种原因：要么是摄影机本身设置了一种不介入的视角，从而使得观众对影像的真切感知不再可能；要么是角色对自身所处情境失去了正常的感知能力。前一种暂且不表，此处只谈及角色感知失效的情形，同样有两种形式。'

  expect(splitSentence(text)).toEqual(
    [ "影像感知来自于两个方面，一个是摄影机，一个是角色。"
    , "因而，感知的失效也就有两种原因：要么是摄影机本身设置了一种不介入的视角，从而使得观众对影像的真切感知不再可能；"
    , "要么是角色对自身所处情境失去了正常的感知能力。"
    , "前一种暂且不表，此处只谈及角色感知失效的情形，同样有两种形式。"
    ]
  )
})


test('Place one space before/after English words', () => {
  let text = '有 5 个或者四个人。？？\n\n你好啊世界'

  expect(splitSentence(text)).toEqual(
    [ "有 5 个或者四个人。？？"
    , "你好啊世界"
    ]
  )
})

test('Split Quote', () => {
  let text = '她追问她的孩子：“你最爱的人是谁？”，然后心满意足地等待她的答案，“妈妈”。那些面目模糊的朋友们笑作一团。'

  expect(splitSentence(text)).toEqual(
    [ "她追问她的孩子：“你最爱的人是谁？”，然后心满意足地等待她的答案，“妈妈”。"
    , "那些面目模糊的朋友们笑作一团。"
    ]
  )
})
