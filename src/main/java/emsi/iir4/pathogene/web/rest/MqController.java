package emsi.iir4.pathogene.web.rest;

import java.math.BigInteger;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mq")
public class MqController {

    @Autowired
    private RabbitTemplate template;

    @Autowired
    private DirectExchange exchange;

    @PostMapping("/analyze")
    public String send(@RequestParam byte[] photo) {
        // BigInteger.valueOf(id).toByteArray()
        System.out.println(" [x] Requesting classification.....");
        System.out.println("from :" + exchange.getName());
        byte[] response = (byte[]) template.convertSendAndReceive("", "rpc_queue", photo);
        System.out.println("[x]" + new String(response));
        return new String(response);
    }
}
